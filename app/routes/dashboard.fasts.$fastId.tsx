import { json, type LoaderFunction } from '@remix-run/node';
import { getFast } from '~/server/db.server';
import { type Params, useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const docId = params.fastId;

  if (!docId) {
    return json({ status: 404 });
  }

  return getFast(request, docId);
};

export default function FastPage() {
  const fast = useLoaderData();

  console.log({ fast });
  return <div>FastPage</div>;
}
