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

// Products Collection
export const productsCollection = collection(db, "products");

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
    const docRef = await addDoc(productsCollection, {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
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
    const docRef = await addDoc(contactsCollection, {
      ...contactData,
      createdAt: new Date(),
      status: "new", // new, read, replied
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding contact message:", error);
    throw error;
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