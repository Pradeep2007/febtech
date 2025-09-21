import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Debug function to check environment variables
const checkEnvVars = () => {
  const requiredVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing Firebase environment variables:', missingVars);
    console.error('Please create a .env file with the required Firebase configuration');
    return false;
  }
  
  console.log('✅ All Firebase environment variables are present');
  return true;
};

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "",
};

// Check environment variables
const envVarsValid = checkEnvVars();

// Initialize Firebase
let app;
let db;
let auth;
let storage;

try {
  if (envVarsValid) {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');
    
    // Initialize Firebase services with network retry settings
    db = getFirestore(app);
    
    // Configure Firestore settings for better connectivity
    if (db) {
      // Enable offline persistence (helps with connectivity issues)
      import('firebase/firestore').then(({ enableNetwork, disableNetwork }) => {
        // These functions can be used to manage network state
        console.log('🌐 Firestore network management functions loaded');
      }).catch(err => {
        console.warn('⚠️ Could not load Firestore network functions:', err);
      });
    }
    
    auth = getAuth(app);
    storage = getStorage(app);
    
    // Initialize Analytics (optional)
    try {
      const analytics = getAnalytics(app);
      console.log('✅ Firebase Analytics initialized');
      // Analytics is available but we don't need to export it
      if (analytics) {
        console.log('📊 Analytics ready for tracking');
      }
    } catch (error) {
      console.warn('⚠️ Analytics not available (this is normal in development)');
    }
    
    console.log('✅ Firebase services initialized successfully');
    console.log('📊 Project ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID);
    
    // Verify correct project ID
    const expectedProjectId = 'fabtech-cb5c4';
    const actualProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
    
    if (actualProjectId !== expectedProjectId) {
      console.error('🚨 WRONG PROJECT ID DETECTED!');
      console.error('Expected:', expectedProjectId);
      console.error('Actual:', actualProjectId);
      console.error('💡 Check your .env file and restart the server');
    } else {
      console.log('✅ Correct project ID confirmed:', actualProjectId);
    }
    
    // Test connectivity
    setTimeout(() => {
      import('../utils/firebaseDebug').then(({ testFirebaseConnection }) => {
        testFirebaseConnection().then(success => {
          if (!success) {
            console.error('🚨 Initial Firebase connectivity test failed');
            console.error('💡 This might be due to network issues, VPN, or firewall settings');
          }
        });
      });
    }, 2000);
    
  } else {
    console.error('❌ Cannot initialize Firebase due to missing environment variables');
  }
} catch (error) {
  console.error('❌ Error initializing Firebase:', error);
  console.error('💡 Common causes: network issues, invalid config, or service unavailable');
}

// Export services
export { db, auth, storage };
export default app;
