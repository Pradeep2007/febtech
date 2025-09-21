import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";
import { withRetry, handleFirestoreError, checkNetworkConnectivity } from "../utils/networkRetry";

// Products Collection - Initialize only when db is available
export const getProductsCollection = () => {
  if (!db) {
    throw new Error("Firestore database is not initialized");
  }
  return collection(db, "products");
};

// For backward compatibility
export const productsCollection = db ? collection(db, "products") : null;

export const getProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    // Check if db is initialized
    if (!db) {
      throw new Error("Firestore database is not initialized. Please check your Firebase configuration.");
    }

    console.log('🔄 Attempting to add product to Firestore...');
    console.log('📝 Product data:', productData);
    
    // Check network connectivity first
    const isConnected = await checkNetworkConnectivity();
    if (!isConnected) {
      throw new Error('No internet connection detected. Please check your network and try again.');
    }
    
    // Use retry mechanism for the Firestore operation
    const docRef = await withRetry(async () => {
      const collection = getProductsCollection();
      return await addDoc(collection, {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }, 3, 1000); // 3 retries with 1 second base delay
    
    console.log('✅ Product added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding product:", error);
    
    // Use enhanced error handling
    const errorInfo = handleFirestoreError(error);
    console.error("💡 Suggestion:", errorInfo.suggestion);
    
    // Re-throw with user-friendly message
    const enhancedError = new Error(errorInfo.userMessage);
    enhancedError.originalError = error;
    enhancedError.code = error.code;
    throw enhancedError;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    // Check if db is initialized
    if (!db) {
      throw new Error("Firestore database is not initialized. Please check your Firebase configuration.");
    }

    console.log('🔄 Attempting to update product in Firestore...', id);
    console.log('📝 Product data:', productData);
    
    // Check network connectivity first
    const isConnected = await checkNetworkConnectivity();
    if (!isConnected) {
      throw new Error('No internet connection detected. Please check your network and try again.');
    }
    
    // Use retry mechanism for the Firestore operation
    await withRetry(async () => {
      const docRef = doc(db, "products", id);
      return await updateDoc(docRef, {
        ...productData,
        updatedAt: new Date(),
      });
    }, 3, 1000); // 3 retries with 1 second base delay
    
    console.log('✅ Product updated successfully');
  } catch (error) {
    console.error("❌ Error updating product:", error);
    
    // Use enhanced error handling
    const errorInfo = handleFirestoreError(error);
    console.error("💡 Suggestion:", errorInfo.suggestion);
    
    // Re-throw with user-friendly message
    const enhancedError = new Error(errorInfo.userMessage);
    enhancedError.originalError = error;
    enhancedError.code = error.code;
    throw enhancedError;
  }
};

export const deleteProduct = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const q = query(productsCollection, where("category", "==", category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting products by category:", error);
    throw error;
  }
};

// Testimonials Collection
export const testimonialsCollection = collection(db, "testimonials");

export const getTestimonials = async () => {
  try {
    const snapshot = await getDocs(testimonialsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting testimonials:", error);
    throw error;
  }
};

export const addTestimonial = async (testimonialData) => {
  try {
    const docRef = await addDoc(testimonialsCollection, {
      ...testimonialData,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw error;
  }
};

// Partners Collection
export const partnersCollection = collection(db, "partners");

export const getPartners = async () => {
  try {
    const snapshot = await getDocs(partnersCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting partners:", error);
    throw error;
  }
};

// Team Collection
export const teamCollection = collection(db, "team");

export const getTeam = async () => {
  try {
    const snapshot = await getDocs(teamCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting team:", error);
    throw error;
  }
};

// Contact Messages Collection
export const contactsCollection = collection(db, "contacts");

export const addContactMessage = async (contactData) => {
  try {
    // Check if db is initialized
    if (!db) {
      throw new Error("Firestore database is not initialized. Please check your Firebase configuration.");
    }

    console.log('🔄 Attempting to save contact message to Firestore...');
    console.log('📝 Contact data:', contactData);
    
    // Check network connectivity first
    const isConnected = await checkNetworkConnectivity();
    if (!isConnected) {
      throw new Error('No internet connection detected. Please check your network and try again.');
    }
    
    // Use retry mechanism for the Firestore operation
    const docRef = await withRetry(async () => {
      return await addDoc(contactsCollection, {
        ...contactData,
        createdAt: new Date(),
        status: "new", // new, read, replied
      });
    }, 3, 1000); // 3 retries with 1 second base delay
    
    console.log('✅ Contact message saved successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding contact message:", error);
    
    // Use enhanced error handling
    const errorInfo = handleFirestoreError(error);
    console.error("💡 Suggestion:", errorInfo.suggestion);
    
    // Re-throw with user-friendly message
    const enhancedError = new Error(errorInfo.userMessage);
    enhancedError.originalError = error;
    enhancedError.code = error.code;
    throw enhancedError;
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(contactsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting contact messages:", error);
    throw error;
  }
};