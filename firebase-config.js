// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAN-sAl9Li-AUIbCOiLJsTNiR2__7VbvuY",
  authDomain: "squarestair-media-457216.firebaseapp.com",
  projectId: "squarestair-media-457216",
  storageBucket: "squarestair-media-457216.appspot.com",
  messagingSenderId: "212019784274",
  appId: "1:212019784274:web:fb61a4963cf05c5e8a4d8b",
  measurementId: "G-5YMG3R0LY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to save contact form data
export async function saveContactForm(formData) {
  try {
    const docRef = await addDoc(collection(db, "contactSubmissions"), formData);
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: error.message };
  }
}

export { db, storage };