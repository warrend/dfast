import {
  ActionFunction,
  FormData,
  json,
  type LoaderFunction,
} from '@remix-run/node';
import {
  Fast,
  getFast,
  removeFast,
  removeFromCurrentFasts,
} from '~/server/db.server';
import {
  type Params,
  useLoaderData,
  NavLink,
  Form,
  useSubmit,
  useFetcher,
  useActionData,
} from '@remix-run/react';
import { Countdown, links as countdownLinks } from '~/components/countdown';
import styles from '~/styles/fast-page.css';
import { allFastNames, allFastTypes } from '~/constants';
import { Button, links as buttonLinks } from '~/components/button';
import { ArrowLeft } from 'react-feather';
import { RefAttributes, useEffect, useRef, useTransition } from 'react';
import { requireAuth } from '~/server/auth.server';

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
  await requireAuth(request);

  const docId = params.fastId;
  if (!docId) {
    return json({ status: 404, message: 'Page not found' });
  }
  const data = (await getFast(request, docId)) as Fast;

  const secondsLeft =
    Date.parse(data?.end) > new Date().getTime()
      ? Math.floor((Date.parse(data?.end) - new Date().getTime()) / 1000)
      : 0;

  return { ...data, secondsLeft } as Fast;
};

export const action: ActionFunction = async ({
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

  try {
    return await removeFast(request, docId);
  } catch (error) {
    return json({ status: 400 });
  }
};

export default function FastPage() {
  const fast = useLoaderData<Fast>();
  const actionData = useActionData();
  const fetcher = useFetcher();
  const transition = useTransition();

  // const state: 'idle' | 'success' | 'error' | 'submitting' =
  //   transition?.submission
  //     ? 'submitting'
  //     : actionData?.subscription
  //     ? 'success'
  //     : actionData?.error
  //     ? 'error'
  //     : 'idle';

  function handleOnEnd(id: string, nameId: string, typeId: string) {
    if (fast.end >= fast.start) {
      fetcher.submit(
        { fastId: id, typeId, nameId },
        { method: 'post', action: '/dashboard' }
      );
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
          nameId={fast.nameId}
          secondsRemaining={fast.secondsLeft}
          typeId={fast.typeId as string}
          status={fast.status}
        />
        <Form method="post">
          <input type="hidden" defaultValue={fast.id} />
          <Button
            width="135px"
            label="Cancel"
            name="click"
            disabled={false}
            id="form"
            type="submit"
            secondary
          />
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ errorDashPage: error });
  return <div>Error happened</div>;
}
