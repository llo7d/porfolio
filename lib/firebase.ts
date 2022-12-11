import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, query, collectionGroup, where, limit, getDocs,  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { IUserInfo } from "./interfaces";

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

// Helper functions

/**
 * Gets a user document with uid
 * @param {string} uid
*/
export async function getUserWithUID(uid: string) {
  const postQuery = query(
    collectionGroup(firestore, 'users'),
    where('uid', '==', uid),
    limit(1)
  );

  
  const postQuerySnapshot = await getDocs(postQuery)

  if (postQuerySnapshot.empty) {
    return null
  }


  // We do thsi just all in one big line cuz one line = more smart
  return JSON.parse(JSON.stringify(postQuerySnapshot.docs[0].data())) as IUserInfo;


}
