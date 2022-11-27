import { redirect, json } from '@remix-run/node';
import { signOut, getUserSession } from '~/utils/session.server';

export let loader = async ({ request }: { request: Request }) => {
  const sessionUser = await getUserSession(request);
  if (sessionUser) {
    return redirect('/dashboard');
  }

  return json({ ok: true });
};

export default function Index() {
  return (
    <div>
      <h1>Home page?</h1>
    </div>
  );
}
