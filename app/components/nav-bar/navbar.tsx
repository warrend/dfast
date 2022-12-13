import { NavLink } from '@remix-run/react';
import { HomeIcon } from '@heroicons/react/24/outline';
import styles from './styles.css';
import { type ActionFunction } from '@remix-run/node';

export const links = () => [{ rel: 'stylesheet', href: styles }];

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

export function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__wrapper">
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
        <div className="navbar__fast-wrapper">
          <h2>Fasts</h2>
          <div>Something here</div>
          <div>Somthing here</div>
        </div>
      </div>
    </div>
  );
}
