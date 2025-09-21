// Network retry utility for Firestore operations
export const withRetry = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for Firestore operation`);
      const result = await operation();
      console.log(`✅ Operation successful on attempt ${attempt}`);
      return result;
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Attempt ${attempt} failed:`, error.message);
      
      // Don't retry on certain error types
      if (error.code === 'permission-denied' || 
          error.code === 'invalid-argument' ||
          error.code === 'not-found') {
        console.error('❌ Non-retryable error, stopping attempts');
        throw error;
      }
      
      // If this isn't the last attempt, wait before retrying
      if (attempt < maxRetries) {
        const waitTime = delay * attempt; // Exponential backoff
        console.log(`⏳ Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  console.error(`❌ All ${maxRetries} attempts failed`);
  throw lastError;
};

// Check network connectivity
export const checkNetworkConnectivity = async () => {
  try {
    // Try to fetch a small resource to test connectivity
    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    return true;
  } catch (error) {
    console.warn('⚠️ Network connectivity check failed:', error);
    return false;
  }
};

// Enhanced error handler for Firestore operations
export const handleFirestoreError = (error) => {
  console.error('🔥 Firestore Error Details:', {
    code: error.code,
    message: error.message,
    stack: error.stack
  });

  switch (error.code) {
    case 'unavailable':
      return {
        userMessage: 'Service temporarily unavailable. Please check your internet connection and try again.',
        suggestion: 'Check your network connection, disable VPN if active, or try again in a few moments.'
      };
    case 'permission-denied':
      return {
        userMessage: 'Permission denied. Please contact support.',
        suggestion: 'Check Firestore security rules or authentication status.'
      };
    case 'deadline-exceeded':
      return {
        userMessage: 'Request timed out. Please try again.',
        suggestion: 'Network might be slow. Try again or check connectivity.'
      };
    case 'resource-exhausted':
      return {
        userMessage: 'Service is busy. Please try again later.',
        suggestion: 'Firebase quota might be exceeded. Try again later.'
      };
    default:
      return {
        userMessage: 'An unexpected error occurred. Please try again.',
        suggestion: `Unknown error: ${error.code || 'No error code'}`
      };
  }
};
