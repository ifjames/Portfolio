import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as brevoApi from '@getbrevo/brevo';

const contactSchema = {
  name: (val: any) => typeof val === 'string' && val.length >= 2,
  email: (val: any) => typeof val === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  subject: (val: any) => typeof val === 'string' && val.length >= 5,
  message: (val: any) => typeof val === 'string' && val.length >= 10,
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!contactSchema.name(name)) {
      return res.status(400).json({ message: 'Name must be at least 2 characters' });
    }
    if (!contactSchema.email(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }
    if (!contactSchema.subject(subject)) {
      return res.status(400).json({ message: 'Subject must be at least 5 characters' });
    }
    if (!contactSchema.message(message)) {
      return res.status(400).json({ message: 'Message must be at least 10 characters' });
    }

    // Check for Brevo API key
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured');
      return res.status(500).json({ 
        message: 'Email service not configured. Please contact the administrator.' 
      });
    }

    // Configure Brevo
    const apiInstance = new brevoApi.TransactionalEmailsApi();
    apiInstance.setApiKey(brevoApi.TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

    // Prepare email
    const sendSmtpEmail = new brevoApi.SendSmtpEmail();
    sendSmtpEmail.sender = { email: 'noreply@yourdomain.com', name: 'Portfolio Contact Form' };
    sendSmtpEmail.to = [{ email: 'jamesmatthewcastillo4@gmail.com', name: 'James Matthew Castillo' }];
    sendSmtpEmail.replyTo = { email, name };
    sendSmtpEmail.subject = `Portfolio Contact: ${subject}`;
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #4f46e5;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #4f46e5; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Message</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
          <p>This message was sent from your portfolio contact form.</p>
        </div>
      </div>
    `;

    // Send email via Brevo
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({ 
      message: 'Message sent successfully!' 
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      message: 'Failed to send message. Please try again later.' 
    });
  }
}
