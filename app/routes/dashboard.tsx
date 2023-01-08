import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { createContext, useContext, useState } from 'react';
import { Header, links as headerLinks } from '~/components/header';
import { Modal } from '~/components/modal';
import { Navbar, links as navbarLinks } from '~/components/nav-bar';
import { requireAuth } from '~/server/auth.server';
import {
  Fast,
  getCurrentFasts,
  removeFromCurrentFasts,
} from '~/server/db.server';
import styles from '~/styles/dashboard.css';

export const links = () => [
  ...headerLinks(),
  ...navbarLinks(),
  { rel: 'stylesheet', href: styles },
];

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const fastId = form.get('fastId') as string;
  const nameId = form.get('nameId') as string;
  const typeId = form.get('typeId') as string;

  if (!fastId) {
    return json({ status: 422 });
  }

  const res = await removeFromCurrentFasts(request, fastId, nameId, typeId);
  return res;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  const fasts = (await getCurrentFasts(user.uid)) as Fast[];

  return fasts
    .map((fast) => {
      const secondsLeft = Math.floor(
        (Date.parse(fast?.end) - new Date().getTime()) / 1000
      );

      return { ...fast, secondsLeft };
    })
    .reverse() as Fast[];
};

export const CurrentFastContext = createContext({});

export default function DashboardWrapper() {
  const currentFasts = useLoaderData<Fast[]>();

  return (
    <CurrentFastContext.Provider value={currentFasts}>
      <div className="dashboard">
        <div>
          <Header />
          <Navbar currentFasts={currentFasts} />
        </div>
        <main className="dashboard__page">
          <Outlet />
        </main>
      </div>
    </CurrentFastContext.Provider>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ errorDash: error });
  return <div>Error happened</div>;
}
