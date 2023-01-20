import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = require('../firebaseAppVars.json');

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const auth = getAuth(getApp());
const db = getFirestore(getApp());

export { auth, db };
