import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { createContext, useContext, useState } from 'react';
import { Header, links as headerLinks } from '~/components/header';
import { Modal } from '~/components/modal';
import { Navbar, links as navbarLinks } from '~/components/nav-bar';
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

  if (!fastId) {
    return json({ status: 422 });
  }

  const res = await removeFromCurrentFasts(request, fastId);
  console.log({ res });
  return res;
};

export const loader: LoaderFunction = async ({ request }) => {
  const fasts = (await getCurrentFasts(request)) as Fast[];

  return fasts
    .map((fast) => {
      const secondsLeft = Math.floor(
        (Date.parse(fast?.end) - new Date().getTime()) / 1000
      );

      return { ...fast, secondsLeft };
    })
    .reverse();
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
