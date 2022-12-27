import { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { Header, links as headerLinks } from '~/components/header';
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

export default function DashboardWrapper() {
  const currentFasts = useLoaderData<Fast[]>();
  console.log({ currentFasts });
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Navbar currentFasts={currentFasts} />
      </div>
      <main className="dashboard__page">
        <Outlet />
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ error });
  return <div>Error happened</div>;
}
