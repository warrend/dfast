import { redirect, json } from '@remix-run/node';
import { getUserId } from '~/server/auth.server';

export let loader = async ({ request }: { request: Request }) => {
  const sessionUser = await getUserId(request);
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
