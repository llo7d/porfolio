import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, query, collectionGroup, where, limit, getDocs, doc, getDoc, serverTimestamp, setDoc,  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Router from "next/router";
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


/**
 * Sign in a user with GitHub
 * 
*/
export const handleSignInWithGithub = async (): Promise<any> => {
    // Grabs GitHub user data with the users github id
    const getGitHubUserData = async (githubIdOrLogin: string | undefined) => {
      return fetch(`https://api.github.com/user/${githubIdOrLogin}`, {
        headers: { Accept: 'application/json' },
      }).then((res) => {
        return res.json();
      });
    };

    // Sign in using a redirect.
    const provider = new GithubAuthProvider();

    // Add scope to only grab user profile and username
    provider.addScope('read:user user:email');
    await signInWithPopup(auth, provider);

    // Redirect to the home page with Router
    Router.push("/");

    let loggedUser = auth.currentUser;

    if (loggedUser) {
      // Check if user exists in firestore
      const docSnap = await getDoc(doc(firestore, 'users', loggedUser.uid));

      // If user does not exist, create it
      if (!docSnap.exists()) {
        // Calling github api with githubUserId to get github data
        const { html_url, login } = await getGitHubUserData(
          loggedUser.providerData.map((data) => data.uid)[0]
        );

        // Write a new document in the users collection
        await setDoc(doc(firestore, 'users', loggedUser.uid), {
          githubUsername: login,
          githubUrl: html_url,
          githubId: loggedUser.providerData.map((data) => data.uid)[0],
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
          createdAt: serverTimestamp(),
          provider: loggedUser.providerData[0].providerId,
          uid: loggedUser.uid,
          displayName: loggedUser.displayName,
        });

      } else {
        console.log('User already exists in firestore');
      }
    }
};
