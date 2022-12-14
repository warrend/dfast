import { useState } from 'react';
import { type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { FastList, links as fastListLinks } from '~/components/fast-list';
import { Sidebar, links as sidebarLinks } from '~/components/sidebar';
import styles from '~/styles/dashboard.css';
import { fastNameLabels } from '~/constants';

export const links = () => [
  ...fastListLinks(),
  ...sidebarLinks(),
  { rel: 'stylesheet', href: styles },
];

// export const loader: LoaderFunction = async ({ request }) => {
//   return getProjects(request);
// };

export default function Dashboard() {
  const [selectedFast, setSelectedFast] = useState<
    null | keyof typeof fastNameLabels
  >(null);
  // const data = useLoaderData<TProject[]>();

  return (
    <div>
      <h2>Fasts</h2>
      <div className="dashboard__fast-list">
        <FastList
          selectedFast={selectedFast}
          setSelectedFast={setSelectedFast}
        />
      </div>

      <Sidebar visible={selectedFast !== null} setVisible={setSelectedFast} />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ errorDashboard: error });
  return <div>Error happened</div>;
}
