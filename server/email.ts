import nodemailer from 'nodemailer';
import type { InsertContactMessage } from '@shared/schema';

// Create transporter
const createTransporter = () => {
  const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587');
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

export async function sendContactEmail(contactData: InsertContactMessage) {
  try {
    const transporter = createTransporter();
    const TO_EMAIL = process.env.TO_EMAIL || 'jamesmatthewcastillo4@gmail.com';
    const EMAIL_USER = process.env.EMAIL_USER;

    // Email content
    const mailOptions = {
      from: `"${contactData.name}" <${EMAIL_USER}>`, // sender address
      to: TO_EMAIL, // your email
      replyTo: contactData.email, // reply to the contact's email
      subject: `Portfolio Contact: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4f46e5;">Contact Details</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #4f46e5; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
            <p>This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${contactData.name}
        Email: ${contactData.email}
        Subject: ${contactData.subject}
        
        Message:
        ${contactData.message}
        
        ---
        This message was sent from your portfolio contact form.
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Function to verify email configuration
export async function verifyEmailConfig() {
  try {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    
    console.log('Email environment variables:');
    console.log('EMAIL_USER:', EMAIL_USER);
    console.log('EMAIL_PASS:', EMAIL_PASS ? '[HIDDEN]' : 'undefined');
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    
    if (!EMAIL_USER || !EMAIL_PASS) {
      throw new Error('Email credentials not configured');
    }
    
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}
