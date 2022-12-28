import { json, type LoaderFunction } from '@remix-run/node';
import { getFast } from '~/server/db.server';
import { type Params, useLoaderData } from '@remix-run/react';
import { Countdown, links as countdownLinks } from '~/components/countdown';
import styles from '~/styles/fast-page.css';

export const links = () => [
  ...countdownLinks(),
  { rel: 'stylesheet', href: styles },
];

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
  return (
    <div className="fast-page">
      <Countdown fastEndISODate={fast.end} size={64} />
    </div>
  );
}
