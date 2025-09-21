import { db } from '../firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Test Firebase connection
export const testFirebaseConnection = async () => {
  console.log('🔍 Testing Firebase connection...');
  
  try {
    // Check if db is initialized
    if (!db) {
      console.error('❌ Firestore database is not initialized');
      return false;
    }

    // Try to read from a test collection
    console.log('📖 Testing read access...');
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Read access successful. Documents found:', snapshot.size);

    // Try to write to a test collection
    console.log('✍️ Testing write access...');
    const testDoc = {
      message: 'Test connection',
      timestamp: new Date(),
      testId: Math.random().toString(36).substr(2, 9)
    };
    
    const docRef = await addDoc(testCollection, testDoc);
    console.log('✅ Write access successful. Document ID:', docRef.id);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return false;
  }
};

// Test specific contact message functionality
export const testContactMessage = async () => {
  console.log('🔍 Testing contact message functionality...');
  
  try {
    const testContactData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      subject: 'general',
      message: 'This is a test message to verify Firestore functionality'
    };

    const { addContactMessage } = await import('../firebase/firestore');
    const docId = await addContactMessage(testContactData);
    
    console.log('✅ Contact message test successful. Document ID:', docId);
    return true;
  } catch (error) {
    console.error('❌ Contact message test failed:', error);
    return false;
  }
};

// Check environment variables
export const checkEnvironmentVariables = () => {
  console.log('🔍 Checking environment variables...');
  
  const requiredVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN', 
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
  ];

  const results = {};
  let allPresent = true;

  requiredVars.forEach(varName => {
    const value = process.env[varName];
    results[varName] = {
      present: !!value,
      value: value ? `${value.substring(0, 10)}...` : 'undefined'
    };
    if (!value) allPresent = false;
  });

  console.table(results);
  
  if (allPresent) {
    console.log('✅ All required environment variables are present');
  } else {
    console.error('❌ Some environment variables are missing');
    console.error('Please create a .env file in your project root with the required Firebase configuration');
  }

  return allPresent;
};

// Run all diagnostics
export const runFirebaseDiagnostics = async () => {
  console.log('🚀 Running Firebase diagnostics...');
  console.log('='.repeat(50));
  
  const envCheck = checkEnvironmentVariables();
  console.log('');
  
  if (!envCheck) {
    console.log('❌ Skipping connection tests due to missing environment variables');
    return false;
  }
  
  const connectionTest = await testFirebaseConnection();
  console.log('');
  
  const contactTest = await testContactMessage();
  console.log('');
  
  console.log('='.repeat(50));
  console.log('📊 Diagnostics Summary:');
  console.log('Environment Variables:', envCheck ? '✅' : '❌');
  console.log('Firebase Connection:', connectionTest ? '✅' : '❌');
  console.log('Contact Message Test:', contactTest ? '✅' : '❌');
  
  return envCheck && connectionTest && contactTest;
};
