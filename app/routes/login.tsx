import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
  useTransition,
} from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import * as firebaseRest from '~/firebase-rest';
import {
  checkSessionCookie,
  signIn,
  signInWithToken,
} from '~/server/auth.server';
import { commitSession, getSession } from '~/sessions';
import { getRestConfig } from '~/server/firebase.server';
import { Input, links as inputLinks } from '~/components/input';
import { Button, links as buttonLinks } from '~/components/button';
import styles from '~/styles/login-page.css';
import { objectKeys } from '~/helpers';
import { setErrorMessage } from '~/server/messages.server';

interface LoaderData {
  apiKey: string;
  domain: string;
}

export const links = () => [
  ...inputLinks(),
  ...buttonLinks(),
  { rel: 'stylesheet', href: styles },
];

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));
  const { uid } = await checkSessionCookie(session);
  const headers = {
    'Set-Cookie': await commitSession(session),
  };
  if (uid) {
    return redirect('/dashboard', { headers });
  }
  const { apiKey, domain } = getRestConfig();
  return json<LoaderData>({ apiKey, domain }, { headers });
};

interface ActionData {
  error?: string;
}

type Error = {
  email?: string;
  password?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));
  const form = await request.formData();
  const email = form.get('email') as string;
  const password = form.get('password') as string;

  const error: Error = {};

  if (email === '') {
    error.email = 'Must include email';
  }

  if (password === '') {
    error.password = 'Must include password';
  }

  if (objectKeys(error).length > 0) {
    return json({ status: 401, error: error });
  }

  try {
    return await signIn(request, email, password);
  } catch (error) {
    session.flash('error', 'Invalid username/password');
    return json({ status: 401, error });
  }
};

export default function Login() {
  const action = useActionData();
  const transition = useTransition();

  const state: 'idle' | 'success' | 'error' | 'submitting' =
    transition.submission
      ? 'submitting'
      : action?.subscription
      ? 'success'
      : action?.error
      ? 'error'
      : 'idle';

  console.log({ action, transition });

  useEffect(() => {
    if (action?.error?.code) {
      toast.error('Error with login info.');
    }
  }, [action]);

  return (
    <div className="login-page">
      <div className="login-page__content-wrapper">
        <div className="login-page__logo-wrapper">LOGO</div>
        <div className="login-page__content">
          <Form method="post" id="login-form">
            <Input
              name="email"
              placeholder="you@example.com"
              type="email"
              label="Email"
              width="100%"
              error={action?.error && action?.error.email}
            />
            <Input
              name="password"
              placeholder="password"
              type="password"
              label="Password"
              width="100%"
              error={action?.error && action?.error.password}
            />
            <div className="login-page__button-wrapper">
              <Button
                id="login-form"
                type="submit"
                label={state === 'submitting' ? 'Loading' : 'Login'}
                width="100px"
                name="login"
                disabled={state === 'submitting'}
              />
            </div>
          </Form>
          <div className="login-page__signup-wrapper">
            Don't have an account?{' '}
            <Link style={{ color: 'var(--primary500)' }} to="/signup">
              Sign up here.
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
