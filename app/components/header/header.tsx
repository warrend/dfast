import styles from './styles.css';
import { User } from 'react-feather';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">LUD</div>
        <div className="header__nav">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
