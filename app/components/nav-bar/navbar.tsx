import { NavLink, useFetcher } from '@remix-run/react';
import { HomeIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import styles from './styles.css';
import { type ActionFunction } from '@remix-run/node';
import { Countdown, links as countdownLinks } from '../countdown';
import { type Fast } from '~/server/db.server';
import { CircleIcon } from '../circle-icon';
import { allFastTypes, fastNameIcons } from '~/constants';

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
    icon: <HomeIcon width={20} height={20} color="var(--grey600)" />,
  },
  {
    name: 'Records',
    link: '/dashboard/records',
    icon: <BookOpenIcon width={20} height={20} color="var(--grey600)" />,
  },
];

const activeStyle = {
  background: 'var(--grey100)',
  borderColor: 'var(--primary500)',
};

export function Navbar({ currentFasts }: { currentFasts: Fast[] }) {
  const fetcher = useFetcher();

  function onFastEnd(
    id: string,
    nameId: string,
    typeId: keyof typeof allFastTypes
  ) {
    fetcher.submit(
      { fastId: id, nameId, typeId: typeId as string },
      { method: 'post', action: '/dashboard', replace: true }
    );
  }
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
            end
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
            currentFasts.map(({ id, nameId, secondsLeft, typeId }) => (
              <NavLink key={id} to={`fasts/${id}`}>
                <div className="navbar__current-fast">
                  <div className="navbar__circle-wrapper">
                    <CircleIcon
                      backgroundColor="var(--accent100)"
                      icon={fastNameIcons[nameId as keyof typeof fastNameIcons]}
                    />
                  </div>
                  <Countdown
                    id={id!}
                    secondsRemaining={secondsLeft!}
                    onEnd={onFastEnd}
                    nameId={nameId}
                    typeId={typeId as string}
                  />
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

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ navError: error });
  return <div>Error happened</div>;
}
