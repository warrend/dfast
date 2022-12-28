import { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { createContext, useContext, useState } from 'react';
import { Header, links as headerLinks } from '~/components/header';
import { Modal } from '~/components/modal';
import { Navbar, links as navbarLinks } from '~/components/nav-bar';
import { Fast, getCurrentFasts } from '~/server/db.server';
import styles from '~/styles/dashboard.css';

export const links = () => [
  ...headerLinks(),
  ...navbarLinks(),
  { rel: 'stylesheet', href: styles },
];

export const loader: LoaderFunction = async ({ request }) => {
  return getCurrentFasts(request);
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
  console.log({ error });
  return <div>Error happened</div>;
}
