import { redirect, json } from '@remix-run/node';

export let loader = async ({ request }: { request: Request }) => {
  return json({ ok: true });
};

export default function Index() {
  return (
    <div>
      <h1>Home page?</h1>
    </div>
  );
}
