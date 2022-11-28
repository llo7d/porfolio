import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, Firestore,  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// const firestore = firebase.firestore();
const firestore = getFirestore(app);
// const firebase = firebase.Firestore()
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();


const storage = getStorage(app);

export { app, auth, firestore, storage, googleAuthProvider };