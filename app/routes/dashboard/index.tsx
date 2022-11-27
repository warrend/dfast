import { json, type LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getProjects, type Project } from '~/server/db.server';
import { Navbar, links as navbarLinks } from '~/components/nav-bar';
import styles from '~/styles/dashboard.css';

export const links = () => [
  ...navbarLinks(),
  { rel: 'stylesheet', href: styles },
];

export const loader: LoaderFunction = async ({ request }) => {
  return getProjects(request);
};

export default function Dashboard() {
  const data = useLoaderData<Project[]>();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ error });
  return <div>Error happened</div>;
}
