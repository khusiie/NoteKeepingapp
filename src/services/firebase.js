import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAu4ge2wogGEIH4yhltqkHEQmX2c2PezWE",
    authDomain: "notesapp-f908a.firebaseapp.com",
    projectId: "notesapp-f908a",
    storageBucket: "notesapp-f908a.firebasestorage.app",
    messagingSenderId: "508912622802",
    appId: "1:508912622802:web:32f278f14f627e982c210b",
    measurementId: "G-MZV9JG71TJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Collection reference
const notesCollection = collection(db, 'notes');

// Authentication Functions
export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);

// Add a new note
export const addNote = async (title, content) => {
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  const note = {
    title,
    content,
    userId: auth.currentUser.uid,
    lastModified: new Date().toISOString()
  };
  
  await addDoc(notesCollection, note);
};

// Retrieve notes for the logged-in user
export const getNotes = async () => {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const q = query(notesCollection, where("userId", "==", auth.currentUser.uid), orderBy("lastModified", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update a note
export const updateNote = async (id, updatedData) => {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const noteRef = doc(db, 'notes', id);
  await updateDoc(noteRef, { ...updatedData, lastModified: new Date().toISOString() });
};

// Delete a note
export const deleteNote = async (id) => {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const noteRef = doc(db, 'notes', id);
  await deleteDoc(noteRef);
};




// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
    
//   }
// }