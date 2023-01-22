// const firebaseConfig = {
//   apiKey: process.env.FB_API_KEY,
//   authDomain: process.env.FB_AUTH_DOMAIN,
//   projectId: process.env.FB_PROJECT_ID,
//   storageBucket: process.env.FB_STORAGE_BUCKET,
//   messagingSenderId: process.env.FB_MESSAGE_SENDER_ID,
//   appId: process.env.FB_APP_ID,
//   measurementId: process.env.FB_MEASUREMENT_ID,
// };

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = { ...require('../firebaseAppVars.json') };

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const auth = getAuth(getApp());
const db = getFirestore(getApp());

export { auth, db };
