// Setup verification utility
export const checkSetupStatus = () => {
  console.log('🔍 Checking Firebase setup status...');
  console.log('='.repeat(50));
  
  // Check 1: Environment variables
  const requiredVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
  ];

  console.log('📋 Environment Variables Check:');
  let envVarsOk = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅' : '❌';
    const displayValue = value ? `${value.substring(0, 20)}...` : 'MISSING';
    console.log(`${status} ${varName}: ${displayValue}`);
    if (!value) envVarsOk = false;
  });

  // Check 2: .env file existence
  console.log('\n📁 File Check:');
  if (!envVarsOk) {
    console.log('❌ .env file missing or incomplete');
    console.log('💡 Create .env file in project root with your Firebase config');
  } else {
    console.log('✅ .env file appears to be configured');
  }

  // Check 3: Firebase imports
  console.log('\n📦 Firebase Imports:');
  try {
    const { db } = require('../firebase/config');
    if (db) {
      console.log('✅ Firebase database imported successfully');
    } else {
      console.log('❌ Firebase database not initialized');
    }
  } catch (error) {
    console.log('❌ Error importing Firebase:', error.message);
  }

  // Summary
  console.log('\n📊 Setup Summary:');
  console.log(`Environment Variables: ${envVarsOk ? '✅ Complete' : '❌ Incomplete'}`);
  
  if (!envVarsOk) {
    console.log('\n🚀 Next Steps:');
    console.log('1. Create .env file in project root');
    console.log('2. Add your Firebase configuration values');
    console.log('3. Restart the development server');
    console.log('4. Check Firebase Console for project settings');
  }
  
  console.log('='.repeat(50));
  return envVarsOk;
};

// Auto-run setup check in development
if (process.env.NODE_ENV === 'development') {
  // Run after a short delay to ensure all modules are loaded
  setTimeout(() => {
    checkSetupStatus();
  }, 1000);
}
