import { NavLink, useLoaderData } from '@remix-run/react';
import { HomeIcon } from '@heroicons/react/24/outline';
import styles from './styles.css';
import { type ActionFunction } from '@remix-run/node';
import { Countdown, links as countdownLinks } from '../countdown';
import { type Fast } from '~/server/db.server';
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
      <div className="navbar__pages">
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
      <div style={{ marginLeft: '1rem' }}>
        <h2>Current Fasts</h2>
      </div>
      <div className="navbar__fasts">
        <div>
          {currentFasts.length ? (
            currentFasts.map(({ end, id, nameId }) => (
              <NavLink key={id} to={`fasts/${id}`}>
                <div className="navbar__current-fast">
                  <div className="navbar__circle-wrapper">
                    <CircleIcon
                      backgroundColor="var(--accent100)"
                      icon={fastNameIcons[nameId as keyof typeof fastNameIcons]}
                    />
                  </div>
                  <Countdown fastEndISODate={end} />
                </div>
              </NavLink>
            ))
          ) : (
            <div className="navbar__no-current-fast">No current fasts.</div>
          )}
        </div>
      </div>
    </div>
  );
}
