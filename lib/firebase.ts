import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, query, collectionGroup, where, limit, getDocs, doc, getDoc, serverTimestamp, setDoc, Timestamp, } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Router from "next/router";
import { IUserInfo } from "./interfaces";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBQ4zafWbth79R0k2BShnegeKZWz7g71A8",
  authDomain: "portfolier-7d958.firebaseapp.com",
  projectId: "portfolier-7d958",
  storageBucket: "portfolier-7d958.appspot.com",
  messagingSenderId: "500134491013",
  appId: "1:500134491013:web:9410d4a8097255a6b00aec",
  measurementId: "G-JW62CVYT83"
};



const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// const firestore = firebase.firestore();
const firestore = getFirestore(app);
// const firebase = firebase.Firestore()
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

// export const fromMillis = firebase.firestore.Timestamp.fromMillis;
const fromMillis = Timestamp.fromMillis;


const storage = getStorage(app);

export { app, auth, firestore, storage, googleAuthProvider, fromMillis };

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
 * Sign in and or Sign Up a user with GitHub, then Grab his data from GitHub and then create a new user in firestore
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
        discordName: null,
        twitterUsername: null,
        lastUpdated: {
          //inMiliseconds: new Date().getTime(),
          // inMiliseconds value newDate that is 2 hours ago
          inMiliseconds: new Date(new Date().getTime() - 2 * 60 * 60 * 1000).getTime(),

          // create a new Date object that is 2 hours ago
          inFirebaseDate: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),


        },
        longDescription: "I have not written anything about myself yet",
        shortDescription: "I have not written anything about myself yet",
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
