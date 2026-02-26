import { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  setSessionId: (id: string) => void;
  onUpdate: (data: any) => void;
}

export function RestaurantInfoStep({ data, sessionId, setSessionId, onUpdate }: Props) {
  const [formData, setFormData] = useState({
    name: data.name || '',
    nameEn: data.nameEn || '',
    description: data.description || '',
    descriptionEn: data.descriptionEn || '',
    cuisine: data.cuisine || '',
    city: data.city || '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Initialize wizard session if not exists
    if (!sessionId) {
      initializeSession();
    }
  }, []);

  const initializeSession = async () => {
    try {
      const response = await fetch('/api/wizard/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email || 'temp@example.com', // Will be updated later
        }),
      });
      const result = await response.json();
      setSessionId(result.session.id);
    } catch (error) {
      console.error('Failed to initialize session:', error);
    }
  };

  const handleAIGenerate = async () => {
    if (!formData.name) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/wizard/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          input: formData.name,
          type: 'restaurant-info',
        }),
      });
      const result = await response.json();

      setFormData(prev => ({
        ...prev,
        nameEn: result.result.name_en || prev.nameEn,
        description: result.result.description || prev.description,
        descriptionEn: result.result.description_en || prev.descriptionEn,
        cuisine: result.result.cuisine || prev.cuisine,
      }));
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Restaurant Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., Ravintola Babylon"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
        {formData.name && (
          <button
            onClick={handleAIGenerate}
            disabled={isGenerating}
            className="mt-2 text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1 disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
            {isGenerating ? 'AI is generating...' : 'Fill with AI'}
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cuisine Type
        </label>
        <select
          value={formData.cuisine}
          onChange={(e) => handleChange('cuisine', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select cuisine type</option>
          <option value="finnish">Finnish</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="indian">Indian</option>
          <option value="thai">Thai</option>
          <option value="japanese">Japanese</option>
          <option value="burger">Burger & American</option>
          <option value="pizza">Pizza</option>
          <option value="kebab">Kebab</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Finnish)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your restaurant..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (English)
        </label>
        <textarea
          value={formData.descriptionEn}
          onChange={(e) => handleChange('descriptionEn', e.target.value)}
          placeholder="Describe your restaurant in English..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="e.g., Helsinki"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </div>
  );
}
