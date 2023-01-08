import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button, links as buttonLinks } from '~/components/button';
import { destroySession, getSession } from '~/sessions';

const LOGOUT_MESSAGE = 'Please confirm you want to logout.';
const LOGOUT_HEADER = 'Logout';

export const links = () => [...buttonLinks()];

export const action = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: { 'Set-Cookie': await destroySession(session) },
  });
};

export default function Logout() {
  return (
    <div className="logout">
      <h2>{LOGOUT_HEADER}</h2>
      <p>{LOGOUT_MESSAGE}</p>
      <Form method="post" id="logout">
        <Button
          type="submit"
          label="Logout"
          width="100px"
          name="logout"
          id="logout"
        />
      </Form>
    </div>
  );
}
