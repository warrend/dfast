import type { Session } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import type { UserRecord } from 'firebase-admin/auth';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from 'firebase/auth';

import { commitSession, destroySession, getSession } from '~/sessions';

import { auth } from './firebase.server';

export const getUserId = async (request: Request) => {
  const session = await getSession(request.headers.get('cookie'));
  const { uid } = await checkSessionCookie(session);
  return uid;
};

export const checkSessionCookie = async (session: Session) => {
  try {
    const decodedIdToken = await auth.server.verifySessionCookie(
      session.get('session') || ''
    );
    return decodedIdToken;
  } catch {
    return { uid: undefined };
  }
};

export async function signIn(
  request: Request,
  email: string,
  password: string
) {
  const auth = getAuth();
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await user.getIdToken();
  const sessionCookie = await signInWithToken(idToken);

  const session = await getSession(request.headers.get('cookie'));
  session.set('session', sessionCookie);
  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const requireAuth = async (request: Request): Promise<UserRecord> => {
  const session = await getSession(request.headers.get('cookie'));
  const { uid } = await checkSessionCookie(session);
  if (!uid) {
    throw redirect('/login', {
      headers: { 'Set-Cookie': await destroySession(session) },
    });
  }
  return auth.server.getUser(uid);
};

// export const signIn = async (email: string, password: string) => {
//   const { idToken } = await auth.signInWithPassword(email, password);
//   return signInWithToken(idToken);
// };

export const signInWithToken = async (idToken: string) => {
  const expiresIn = 1000 * 60 * 60 * 24 * 7; // 1 week
  const sessionCookie = await auth.server.createSessionCookie(idToken, {
    expiresIn,
  });
  return sessionCookie;
};

export const signUp = async (name: string, email: string, password: string) => {
  await auth.server.createUser({
    email,
    password,
    displayName: name,
  });
  // return await signIn(email, password);
};
