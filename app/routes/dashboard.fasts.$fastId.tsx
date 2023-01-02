import {
  ActionFunction,
  FormData,
  json,
  type LoaderFunction,
} from '@remix-run/node';
import { Fast, getFast, removeFromCurrentFasts } from '~/server/db.server';
import {
  type Params,
  useLoaderData,
  NavLink,
  Form,
  useSubmit,
  useFetcher,
} from '@remix-run/react';
import { Countdown, links as countdownLinks } from '~/components/countdown';
import styles from '~/styles/fast-page.css';
import { allFastNames } from '~/constants';
import { Button, links as buttonLinks } from '~/components/button';
import { ArrowLeft } from 'react-feather';
import { RefAttributes, useEffect, useRef } from 'react';

export const links = () => [
  ...buttonLinks(),
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

  const data = (await getFast(request, docId)) as Fast;
  const secondsLeft = Math.floor(
    (Date.parse(data?.end) - new Date().getTime()) / 1000
  );

  return { ...data, secondsLeft: secondsLeft < 0 ? 0 : secondsLeft };
};

// export const action: ActionFunction = async ({ request }) => {
//   const form = await request.formData();
//   const fastId = form.get('fastId') as string;

//   if (!fastId) {
//     return json({ status: 422 });
//   }

//   const res = await removeFromCurrentFasts(request, fastId);
//   console.log({ res });
//   return res;
// };

export default function FastPage() {
  const fast = useLoaderData<Fast>();
  const fetcher = useFetcher();

  function handleOnEnd(id: string) {
    if (fast.end >= fast.start) {
      fetcher.submit({ fastId: id }, { method: 'post', action: '/dashboard' });
    }
  }

  return (
    <div className="fast-page">
      <NavLink to="/dashboard">
        <div className="fast-page__go-back-button">
          <ArrowLeft />
        </div>
      </NavLink>
      <div className="fast-page__countdown">
        <div>{allFastNames[fast.nameId as keyof typeof allFastNames]} Fast</div>
        <Countdown
          id={fast.id}
          size="12vw"
          onEnd={handleOnEnd}
          secondsRemaining={fast.secondsLeft}
        />
        {/* <Button
          width="135px"
          label="Cancel"
          name="click"
          disabled={false}
          id="form"
          type="button"
          secondary
          // onClick={() => setVisible(null)}
        /> */}
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ errorDashPage: error });
  return <div>Error happened</div>;
}
