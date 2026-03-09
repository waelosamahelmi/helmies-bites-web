import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { menuData, contentType } = req.body;

    if (!menuData) {
      return res.status(400).json({ error: 'No menu data provided' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    // Build the message for OpenRouter
    const systemPrompt = `You are a menu parsing assistant. Extract all menu items from the provided image or text and return them in a structured JSON format.

Return ONLY valid JSON in this exact format:
{
  "categories": [
    {
      "name": "Category Name",
      "name_fi": "Finnish name",
      "name_en": "English name",
      "items": [
        {
          "name": "Item Name",
          "name_fi": "Finnish name",
          "name_en": "English name", 
          "description": "Item description",
          "price": 12.50
        }
      ]
    }
  ]
}

Rules:
- Extract ALL items from the menu
- Prices should be numbers (not strings)
- If price is unclear, use null
- Translate item names to Finnish and English
- Group items by category (Appetizers, Main Courses, Desserts, Drinks, etc.)
- If no clear categories exist, create logical ones`;

    let messages: any[] = [
      { role: 'system', content: systemPrompt }
    ];

    // Handle image vs text content
    if (contentType === 'image' && menuData.startsWith('data:')) {
      // Image content - use vision model
      messages.push({
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: menuData
            }
          },
          {
            type: 'text',
            text: 'Please extract all menu items from this image and return as JSON.'
          }
        ]
      });
    } else {
      // Text content
      messages.push({
        role: 'user',
        content: `Please extract all menu items from this menu and return as JSON:\n\n${menuData}`
      });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://helmiesbites.com',
        'X-Title': 'HelmiesBites Menu Parser'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages,
        max_tokens: 4096,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter error:', errorText);
      return res.status(500).json({ error: 'Failed to parse menu with AI', details: errorText });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    // Extract JSON from the response (in case there's extra text)
    let parsedMenu;
    try {
      // Try to find JSON in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedMenu = JSON.parse(jsonMatch[0]);
      } else {
        parsedMenu = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', content);
      return res.status(500).json({ 
        error: 'Failed to parse AI response', 
        raw: content 
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: parsedMenu 
    });

  } catch (error) {
    console.error('Menu parsing error:', error);
    return res.status(500).json({ 
      error: 'Failed to parse menu', 
      details: String(error) 
    });
  }
}
