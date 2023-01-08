import { type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireAuth } from '~/server/auth.server';
import { getRecords } from '~/server/db.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  const records = await getRecords(user.uid);

  console.log({ records });
  return records;
};

export default function Records() {
  const loaderData = useLoaderData();
  return (
    <div>
      <h2>Records</h2>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
