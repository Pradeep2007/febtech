# 🚀 Quick Setup Guide

## Step 1: Create .env File

1. **Create a new file** called `.env` in your project root (same folder as package.json)
2. **Copy this content** into the `.env` file:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyDsnOPcZ1yh9MavyQXE44yhuPXdigfZ0b8
REACT_APP_FIREBASE_AUTH_DOMAIN=fabtech-cb5c4.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=fabtech-cb5c4
REACT_APP_FIREBASE_STORAGE_BUCKET=fabtech-cb5c4.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=55533279070
REACT_APP_FIREBASE_APP_ID=1:55533279070:web:a2593d6ae83c676447a1cf
REACT_APP_FIREBASE_MEASUREMENT_ID=G-G64TTY3MXV
```

3. **Save the file**

## Step 2: Setup Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **fabtech-cb5c4**
3. Go to **Firestore Database**
4. If not created yet, click **"Create database"**
5. Choose **"Start in test mode"**
6. Select a location (choose closest to your users)

## Step 3: Update Security Rules

1. In Firestore Database, go to **"Rules"** tab
2. **Replace all content** with the rules from `firestore-rules.txt`
3. Click **"Publish"**

## Step 4: Test Everything

1. **Start your development server**:
   ```bash
   npm start
   ```
   Or double-click `start-dev.bat`

2. **Check browser console** for these messages:
   ```
   ✅ All Firebase environment variables are present
   ✅ Firebase app initialized successfully
   ✅ Firebase services initialized successfully
   📊 Project ID: fabtech-cb5c4
   ```

3. **Test Contact Form**:
   - Go to Contact page
   - Fill out and submit the form
   - Should see "Message sent successfully!"

4. **Test Products**:
   - Go to Products page
   - Click "Admin Mode"
   - Click "Quick Test" - should see success message
   - Try adding a real product with "Add Product"

## 🎯 Expected Results

### ✅ Success Indicators:
- No error messages in console
- Contact form submissions work
- Products can be added/edited
- Test buttons show success messages

### ❌ If You See Errors:
- Check `.env` file is in the right location
- Verify all environment variables are correct
- Check Firestore rules are published
- Restart development server after creating .env

## 🆘 Troubleshooting

### "Permission denied" errors:
- Update Firestore security rules as shown above

### "Firestore database is not initialized":
- Check `.env` file exists and has correct values
- Restart development server

### Network/connectivity errors:
- Check internet connection
- Disable VPN if using one
- Try from different network

---

**Your Firebase project is ready to use!** 🎉
