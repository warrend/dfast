import { NavLink, useLoaderData } from '@remix-run/react';
import { HomeIcon } from '@heroicons/react/24/outline';
import styles from './styles.css';
import { type LoaderFunction, type ActionFunction } from '@remix-run/node';
import { Countdown, links as countdownLinks } from '../countdown';
import { Fast, getCurrentFasts } from '~/server/db.server';
import { CircleIcon } from '../circle-icon';
import { fastNameIcons } from '~/constants';

export const links = () => [
  ...countdownLinks(),
  { rel: 'stylesheet', href: styles },
];

export const action: ActionFunction = async ({ request }) => {
  // return signOut(request);
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
    name: 'Test',
    link: '/test',
    icon: <HomeIcon width={20} height={20} />,
  },
];

const activeStyle = {
  background: 'var(--grey100)',
  borderColor: 'var(--primary500)',
};

export function Navbar({ currentFasts }: { currentFasts: Fast[] }) {
  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__inner">
          <h2>Pages</h2>

          {navLinks.map(({ link, name, icon }) => (
            <NavLink
              key={link}
              to={link}
              className="navbar__link"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div className="">{icon}</div>
              <div>{name}</div>
            </NavLink>
          ))}
        </div>
        <div className="navbar__fast-wrapper">
          <h2>Fasts</h2>
          {currentFasts?.map(({ end, id, nameId }) => (
            <div key={id} className="navbar__current-fast">
              <div className="navbar__circle-wrapper">
                <CircleIcon
                  backgroundColor="var(--accent100)"
                  icon={fastNameIcons[nameId as keyof typeof fastNameIcons]}
                />
              </div>
              <Countdown fastEndISODate={end} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
