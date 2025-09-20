# Email Setup Instructions

This contact form is designed to send email notifications to the admin when users submit the contact form. Currently, it's set up with a basic implementation that logs the data to the console.

## Current Implementation

The contact form:

1. ✅ Saves form data to Firebase Firestore
2. ✅ Shows success/error messages to users
3. ✅ Includes form validation
4. ✅ Has attractive UI with social media links
5. ⚠️ Email notifications are currently simulated (logged to console)

## To Enable Real Email Notifications

### Option 1: Backend API (Recommended)

Create a backend API endpoint that handles email sending:

1. **Create a backend service** (Node.js/Express, Python/Flask, etc.)
2. **Use an email service** like:

   - SendGrid
   - AWS SES
   - Nodemailer with SMTP
   - Mailgun
   - Postmark

3. **Update the frontend** to call your API:

```javascript
// In src/utils/emailService.js
export const sendContactNotification = async (contactData) => {
  try {
    const response = await fetch("/api/send-contact-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email notification:", error);
    throw new Error("Failed to send email notification");
  }
};
```

### Option 2: Firebase Functions

Use Firebase Cloud Functions to send emails:

1. **Install Firebase CLI** and initialize functions
2. **Create a Cloud Function** that triggers on Firestore writes
3. **Use an email service** within the function

### Option 3: Third-party Form Services

Integrate with services like:

- Formspree
- Netlify Forms
- Typeform
- Google Forms

## Email Templates

The current implementation includes email templates for:

- Admin notification (when form is submitted)
- User confirmation (sent to the user)

These templates are in `src/utils/emailService.js` and can be customized.

## Social Media Links

The contact form includes social media links that can be updated in the `socialLinks` array in `src/components/Contact.js`:

```javascript
const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/yourpage",
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/yourhandle",
    color: "hover:text-blue-400",
  },
  // ... more social links
];
```

## Testing

To test the current implementation:

1. Fill out the contact form
2. Submit it
3. Check the browser console for the logged data
4. Check Firebase Firestore for the saved data

## Security Considerations

When implementing real email functionality:

- Never expose API keys in frontend code
- Use environment variables for sensitive data
- Implement rate limiting
- Validate and sanitize all input data
- Use HTTPS for all communications
