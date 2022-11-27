import { Form, Link } from '@remix-run/react';
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import styles from './styles.css';
import { type ActionFunction } from '@remix-run/node';
import { signOut } from '~/utils/session.server';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export const action: ActionFunction = async ({ request }) => {
  return signOut(request);
  // await signOut(request);
  // redirect('login');
};

const navLinks = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: <HomeIcon width={20} height={20} />,
  },
  {
    name: 'Projects',
    link: 'projects',
    icon: <ClipboardDocumentCheckIcon width={20} height={20} />,
  },
];

export function Navbar() {
  return (
    <nav className="navbar">
      <Form method="post">
        <button type="submit">Logout</button>
      </Form>
      <ul className="navbar__wrapper">
        {navLinks.map(({ link, name, icon }) => (
          <li key={name} className="navbar__item">
            <Link to={link} className="navbar__link">
              <div className="navbar__item-wrapper">
                {icon}
                <div className="navbar__link-text">{name}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
