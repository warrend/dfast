import { redirect, type Session } from '@remix-run/node';
import * as admin from 'firebase-admin';
import { type UserRecord } from 'firebase-admin/lib/auth/user-record';
import { commitSession, destroySession, getSession } from '~/sessions';

const serviceAccount = require('../../serviceAccountKey.json');

let auth: any;

if (admin.apps.length === 0) {
  auth = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const getUserId = async (request: Request) => {
  const session = await getSession(request.headers.get('cookie'));
  const { uid } = await checkSessionCookie(session);
  return uid;
};

export const checkSessionCookie = async (session: Session) => {
  try {
    const decodedIdToken = await auth.verifySessionCookie(
      session.get('session') || ''
    );
    return decodedIdToken;
  } catch {
    return { uid: undefined };
  }
};

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

export const isSessionValid = async (request: Request, redirectTo: string) => {
  const session = await getSession(request.headers.get('cookie'));
  try {
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(session.get('idToken'), true /** checkRevoked */);
    return { success: true, decodedClaims };
  } catch (error) {
    // Session cookie is unavailable or invalid. Force user to login.
    // return { error: error?.message };
    throw redirect(redirectTo, {
      statusText: error?.message,
    });
  }
};

const setCookieAndRedirect = async (
  request: Request,
  sessionCookie: string,
  redirectTo = '/'
) => {
  const session = await getSession(request.headers.get('cookie'));
  session.set('idToken', sessionCookie);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export const sessionLogin = async (
  request: Request,
  idToken: string,
  redirectTo: string
) => {
  await admin.auth().verifyIdToken(idToken);
  console.log('idtoken verified', idToken);

  return admin
    .auth()
    .createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        return setCookieAndRedirect(request, sessionCookie, redirectTo);
      },
      (error) => {
        return {
          error: `sessionLogin error!: ${error.message}`,
        };
      }
    );
};

export const sessionLogout = async (request: Request) => {
  const session = await getSession(request.headers.get('cookie'));

  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  return admin
    .auth()
    .verifySessionCookie(session.get('idToken'), true /** checkRevoked */)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims?.sub);
    })
    .then(async () => {
      return redirect('/login', {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      });
    })
    .catch((error) => {
      console.log(error);
      // Session cookie is unavailable or invalid. Force user to login.
      return { error: error?.message };
    });
};
