import { type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProjects, type Project } from '~/server/db.server';
import { links as navbarLinks } from '~/components/nav-bar';
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
  return <div>Error happened</div>;
}
