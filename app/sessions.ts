import { createCookieSessionStorage } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set!');
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'lud__session',
      secrets: [sessionSecret],
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
    },
  });
