# Firestore Setup Guide

## Issue: Data Not Storing in Firestore

This guide will help you resolve the Firestore storage issue and get your contact form working properly.

## 🔍 Common Issues and Solutions

### 1. Missing Environment Variables (Most Common)

**Problem**: Firebase configuration is undefined because environment variables are missing.

**Solution**:
1. Create a `.env` file in your project root (same level as `package.json`)
2. Copy the contents from `.env.example` and replace with your actual Firebase values
3. Get your Firebase configuration from the Firebase Console:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps" and select your web app
   - Copy the configuration values

**Example `.env` file**:
```
REACT_APP_FIREBASE_API_KEY=AIzaSyC...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 2. Firestore Security Rules

**Problem**: Firestore security rules are blocking write operations.

**Solution**: Update your Firestore rules in the Firebase Console:

```javascript
// Allow read/write access to all users (for development only)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**For production**, use more restrictive rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow contact messages to be created by anyone
    match /contacts/{contactId} {
      allow create: if true;
      allow read, update, delete: if false; // Only allow creation
    }
    
    // Other collections can have their own rules
    match /{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### 3. Firebase Project Setup

**Problem**: Firebase project is not properly configured.

**Solution**:
1. Ensure you have created a Firebase project
2. Enable Firestore Database:
   - Go to Firebase Console → Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" for development
3. Enable Authentication (if needed):
   - Go to Authentication → Sign-in method
   - Enable desired providers

### 4. Network/Connectivity Issues

**Problem**: Network connectivity or firewall blocking Firebase.

**Solution**:
- Check internet connection
- Disable VPN if using one
- Check if corporate firewall is blocking Firebase domains
- Try accessing Firebase Console directly

## 🧪 Testing Your Setup

### Using Browser Developer Tools

1. Open your app in the browser
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Look for Firebase diagnostic messages:
   - ✅ Green checkmarks indicate success
   - ❌ Red X marks indicate issues
   - Look for specific error codes and messages

### Manual Testing

1. Fill out the contact form
2. Submit it
3. Check the console for detailed logs
4. Check Firebase Console → Firestore Database to see if data appears

### Using the Debug Utility

The app now includes automatic diagnostics that run in development mode. Check the browser console for:
- Environment variable validation
- Firebase connection test
- Contact message functionality test

## 🚀 Step-by-Step Setup

1. **Create `.env` file** with your Firebase configuration
2. **Restart your development server** (`npm start`)
3. **Check browser console** for diagnostic messages
4. **Update Firestore security rules** if needed
5. **Test the contact form**

## 🔧 Advanced Debugging

### Enable Firestore Debug Logging

Add this to your `src/index.js` before any Firebase imports:

```javascript
// Enable Firestore debug logging
if (process.env.NODE_ENV === 'development') {
  import('firebase/firestore').then(({ enableNetwork, connectFirestoreEmulator }) => {
    // Additional debugging can be added here
  });
}
```

### Check Firestore Rules

In Firebase Console:
1. Go to Firestore Database
2. Click on "Rules" tab
3. Ensure rules allow write access to the `contacts` collection

### Verify Project ID

Make sure your `REACT_APP_FIREBASE_PROJECT_ID` matches exactly with your Firebase project ID (case-sensitive).

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Check the browser console** for specific error messages
2. **Verify all environment variables** are correctly set
3. **Test with a simple document write** using the debug utility
4. **Check Firebase Console** for any service outages
5. **Ensure your Firebase plan** supports Firestore (free tier should work)

## 🔒 Security Best Practices

- Never commit your `.env` file to version control
- Use restrictive Firestore rules in production
- Consider implementing user authentication for better security
- Regularly review and update your security rules

---

**Next Steps**: After following this guide, your contact form should successfully store data in Firestore. If you continue to have issues, check the browser console for specific error messages and refer to the Firebase documentation.
