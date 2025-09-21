import { addProduct, updateProduct, deleteProduct, getProducts } from '../firebase/firestore';

// Test product functionality
export const testProductOperations = async () => {
  console.log('🧪 Testing Product Operations...');
  console.log('='.repeat(50));
  
  try {
    // Test 1: Add a product
    console.log('📝 Test 1: Adding a test product...');
    const testProduct = {
      name: 'Test Product - ' + Date.now(),
      category: 'medicines',
      sku: 'TEST-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      price: 99.99,
      description: 'This is a test product to verify Firestore functionality',
      specifications: {
        'Test Spec': 'Test Value',
        'Created': new Date().toISOString()
      },
      inStock: true,
      stockQuantity: 10
    };
    
    const productId = await addProduct(testProduct);
    console.log('✅ Product added successfully with ID:', productId);
    
    // Test 2: Update the product
    console.log('📝 Test 2: Updating the test product...');
    const updateData = {
      name: testProduct.name + ' (Updated)',
      price: 149.99,
      stockQuantity: 15
    };
    
    await updateProduct(productId, updateData);
    console.log('✅ Product updated successfully');
    
    // Test 3: Get all products
    console.log('📝 Test 3: Fetching all products...');
    const products = await getProducts();
    console.log('✅ Products fetched successfully. Count:', products.length);
    
    // Find our test product
    const ourProduct = products.find(p => p.id === productId);
    if (ourProduct) {
      console.log('✅ Test product found in results:', ourProduct.name);
    } else {
      console.warn('⚠️ Test product not found in results');
    }
    
    // Test 4: Delete the test product (cleanup)
    console.log('📝 Test 4: Cleaning up test product...');
    await deleteProduct(productId);
    console.log('✅ Test product deleted successfully');
    
    console.log('='.repeat(50));
    console.log('🎉 All product tests passed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Product test failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      originalError: error.originalError
    });
    return false;
  }
};

// Quick product add test
export const quickProductTest = async () => {
  console.log('⚡ Quick Product Test...');
  
  try {
    const quickProduct = {
      name: 'Quick Test - ' + Date.now(),
      category: 'equipment',
      sku: 'QUICK-' + Math.random().toString(36).substr(2, 3).toUpperCase(),
      price: 29.99,
      description: 'Quick test product',
      specifications: {},
      inStock: true,
      stockQuantity: 5
    };
    
    const id = await addProduct(quickProduct);
    console.log('✅ Quick product test successful. ID:', id);
    return id;
  } catch (error) {
    console.error('❌ Quick product test failed:', error);
    throw error;
  }
};
