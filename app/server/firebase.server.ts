import {
  getApps as getServerApps,
  initializeApp as initializeServerApp,
  cert as serverCert,
  applicationDefault,
} from 'firebase-admin/app';
import { getAuth as getServerAuth } from 'firebase-admin/auth';
import * as firebaseRest from '../firebase-rest';

// Warning: though getRestConfig is only run server side, its return value may be sent to the client
export const getRestConfig = (): {
  apiKey: string;
  domain: string;
} => {
  if (process.env.NODE_ENV === 'development' && !process.env.FB_API_KEY) {
    return {
      apiKey: 'fake-api-key',
      domain: 'http://localhost:9099/identitytoolkit.googleapis.com',
    };
  } else if (!process.env.FB_API_KEY) {
    throw new Error('Missing API_KEY environment variable');
  } else {
    return {
      apiKey: process.env.FB_API_KEY,
      domain: 'https://identitytoolkit.googleapis.com',
    };
  }
};
const restConfig = getRestConfig();

if (getServerApps().length === 0) {
  let config;
  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.GOOGLE_APPLICATION_CREDENTIALS
  ) {
    console.warn(
      'Missing SERVICE_ACCOUNT environment variable, using local emulator'
    );
    // https://github.com/firebase/firebase-admin-node/issues/776
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
    config = {
      projectId: 'remix-emulator',
    };
  } else if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('Missing SERVICE_ACCOUNT environment variable');
  } else {
    try {
      config = {
        credential: applicationDefault(),
        databaseURL: process.env.FB_DB_URL,
      };
    } catch {
      throw Error('Invalid SERVICE_ACCOUNT environment variable');
    }
  }
  initializeServerApp(config);
}

const signInWithPassword = async (email: string, password: string) => {
  const signInResponse = await firebaseRest.signInWithPassword(
    {
      email,
      password,
      returnSecureToken: true,
    },
    restConfig
  );

  if (firebaseRest.isError(signInResponse)) {
    throw new Error(signInResponse.error.message);
  }

  return signInResponse;
};

export const auth = {
  server: getServerAuth(),
  signInWithPassword,
};
