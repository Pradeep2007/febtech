# 🔥 Firebase Setup Instructions

## Step 1: Create .env File

1. Copy the `.env.example` file and rename it to `.env`
2. Or create a new file called `.env` in your project root with this content:

```
REACT_APP_FIREBASE_API_KEY=your_actual_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_actual_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
REACT_APP_FIREBASE_APP_ID=your_actual_app_id
```

## Step 2: Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" → Web (</>) 
6. Copy the configuration values from the `firebaseConfig` object

Example of what you'll see:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Copy this to REACT_APP_FIREBASE_API_KEY
  authDomain: "project.firebaseapp.com", // Copy this to REACT_APP_FIREBASE_AUTH_DOMAIN
  projectId: "your-project-id", // Copy this to REACT_APP_FIREBASE_PROJECT_ID
  storageBucket: "project.appspot.com", // Copy this to REACT_APP_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789", // Copy this to REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123:web:abc123" // Copy this to REACT_APP_FIREBASE_APP_ID
};
```

## Step 3: Enable Firestore

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select a location for your database

## Step 4: Update Security Rules (Important!)

1. In Firestore Database, go to "Rules" tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create contact messages
    match /contacts/{contactId} {
      allow create: if true;
    }
    // Allow read access to other collections
    match /{document=**} {
      allow read: if true;
    }
  }
}
```

3. Click "Publish"

## Step 5: Test the Setup

1. Save your `.env` file
2. Restart your development server: `npm start`
3. Open browser console (F12)
4. Look for Firebase diagnostic messages:
   - ✅ Green checkmarks = Success
   - ❌ Red X marks = Issues to fix
5. Try submitting the contact form

## 🚨 Common Issues

### Missing Environment Variables
- Make sure `.env` file is in the project root (same level as package.json)
- Restart the development server after creating/editing .env
- Check for typos in variable names (must start with REACT_APP_)

### Permission Denied
- Update Firestore security rules as shown above
- Make sure you're using the correct project ID

### Network Issues
- Disable VPN if you're using one
- Check firewall settings
- Try from a different network

## 🎯 Quick Test

After setup, you should see these messages in the browser console:
```
✅ All Firebase environment variables are present
✅ Firebase app initialized successfully
✅ Firebase services initialized successfully
🔧 Running Firebase diagnostics...
✅ Read access successful
✅ Write access successful
```

If you see ❌ errors, check the specific error messages for guidance.
