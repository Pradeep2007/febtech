// Email service utility for sending contact form notifications
// This is a basic implementation - in production, you would use a proper email service
// like SendGrid, AWS SES, or Nodemailer with a backend service

export const sendContactNotification = async (contactData) => {
  try {
    // In a real application, this would make an API call to your backend
    // which would then send an email using a service like SendGrid or AWS SES
    
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      data: contactData
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, you would:
    // 1. Send the email to admin
    // 2. Send a confirmation email to the user
    // 3. Handle any errors appropriately

    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      adminEmail: 'admin@medicalcompany.com',
      userEmail: contactData.email
    };
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw new Error('Failed to send email notification');
  }
};

// Email template for admin notification
export const getAdminEmailTemplate = (contactData) => {
  return {
    to: 'admin@medicalcompany.com',
    subject: `New Contact Form Submission - ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${contactData.message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from the medical company website contact form.
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            Submitted on: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `
  };
};

// Email template for user confirmation
export const getUserConfirmationTemplate = (contactData) => {
  return {
    to: contactData.email,
    subject: 'Thank you for contacting us - Medical Company',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for contacting us!</h2>
        
        <p>Dear ${contactData.firstName},</p>
        
        <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Your Message Summary</h3>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${contactData.message}</p>
        </div>
        
        <p>If you have any urgent questions, please don't hesitate to call us at <strong>+1 (555) 123-4567</strong>.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            The Medical Company Team
          </p>
        </div>
      </div>
    `
  };
};
