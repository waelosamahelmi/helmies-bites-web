import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Salesman email mapping
const SALESMEN_EMAILS: Record<string, { name: string; email: string }> = {
  pekka: { name: 'Pekka Mäntylä', email: 'pekka.mantyla@gmail.com' },
  reijo: { name: 'Reijo Vilkman', email: 'reijo@suomenteippipaino.com' },
  wael: { name: 'Wael Helmi', email: 'wael@helmies.fi' },
  nagham: { name: 'Nagham Alaa', email: 'nagham@helmies.fi' },
};

const REFERRAL_LABELS: Record<string, string> = {
  google: 'Google',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  wordOfMouth: 'Word of Mouth',
  salesman: 'Salesman',
};

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
    const data = req.body;

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'no-reply@helmies.fi',
        pass: process.env.SMTP_PASS,
      },
    });

    // Format referral info
    const salesmanInfo = data.selectedSalesman && SALESMEN_EMAILS[data.selectedSalesman];
    const referralText = data.referralSource === 'salesman' && salesmanInfo
      ? `Salesman - ${salesmanInfo.name}`
      : REFERRAL_LABELS[data.referralSource] || data.referralSource || 'N/A';

    // Format opening hours
    let hoursText = '';
    if (data.openingHours) {
      hoursText = data.openingHours.map((h: any) => 
        `${h.day}: ${h.closed ? 'Closed' : `${h.open} - ${h.close}`}`
      ).join('\n');
    }

    // Build email content
    const emailHtml = `
      <h2>🍽️ New Restaurant Onboarding</h2>
      
      <h3>Restaurant Details</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.restaurantName || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Cuisine</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.cuisine || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Plan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.plan || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Address</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.street || ''}, ${data.postalCode || ''} ${data.city || ''}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>How they found us</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${referralText}</td></tr>
      </table>

      <h3>Opening Hours</h3>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${hoursText || 'Not provided'}</pre>

      <h3>Menu</h3>
      <p>${data.parsedMenu ? '✅ Menu file uploaded (attached or stored)' : '❌ No menu uploaded'}</p>

      <hr>
      <p style="color: #666; font-size: 12px;">This is an automated message from HelmiesBites onboarding system.</p>
    `;

    const emailText = `
New Restaurant Onboarding

Restaurant Details:
- Name: ${data.restaurantName || 'N/A'}
- Email: ${data.email || 'N/A'}
- Phone: ${data.phone || 'N/A'}
- Cuisine: ${data.cuisine || 'N/A'}
- Plan: ${data.plan || 'N/A'}
- Address: ${data.street || ''}, ${data.postalCode || ''} ${data.city || ''}
- How they found us: ${referralText}

Opening Hours:
${hoursText || 'Not provided'}

Menu: ${data.parsedMenu ? 'Uploaded' : 'Not uploaded'}
    `;

    // Prepare recipients
    const toEmails = [process.env.CONTACT_TO || 'info@helmies.fi'];
    const ccEmails: string[] = [];

    // Add salesman to CC if applicable
    if (data.referralSource === 'salesman' && salesmanInfo) {
      ccEmails.push(salesmanInfo.email);
    }

    // Send main notification email
    await transporter.sendMail({
      from: `"HelmiesBites" <${process.env.SMTP_USER || 'no-reply@helmies.fi'}>`,
      to: toEmails.join(', '),
      cc: ccEmails.length > 0 ? ccEmails.join(', ') : undefined,
      subject: `🍽️ New Restaurant Onboarding: ${data.restaurantName || 'Unknown'}`,
      text: emailText,
      html: emailHtml,
    });

    // If salesman, send them a separate notification
    if (data.referralSource === 'salesman' && salesmanInfo) {
      const salesmanHtml = `
        <h2>🎉 Great news, ${salesmanInfo.name}!</h2>
        <p>A new restaurant signed up through you!</p>
        
        <h3>Restaurant Details</h3>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.restaurantName || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Address</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.street || ''}, ${data.postalCode || ''} ${data.city || ''}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Plan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.plan || 'N/A'}</td></tr>
        </table>

        <p style="margin-top: 20px;">Contact Email: <a href="mailto:${data.email}">${data.email}</a></p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">This is an automated notification from HelmiesBites.</p>
      `;

      await transporter.sendMail({
        from: `"HelmiesBites" <${process.env.SMTP_USER || 'no-reply@helmies.fi'}>`,
        to: salesmanInfo.email,
        subject: `🎉 New Sale: ${data.restaurantName || 'Restaurant'} signed up through you!`,
        html: salesmanHtml,
      });
    }

    return res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ error: 'Failed to submit application', details: String(error) });
  }
}
