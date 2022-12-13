import { Outlet } from '@remix-run/react';
import { Header, links as headerLinks } from '~/components/header';
import { Navbar, links as navbarLinks } from '~/components/nav-bar';
import styles from '~/styles/dashboard.css';

export const links = () => [
  ...headerLinks(),
  ...navbarLinks(),
  { rel: 'stylesheet', href: styles },
];

export default function DashboardWrapper() {
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Navbar />
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
