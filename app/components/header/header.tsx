import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">LOGO</div>
        <div className="header__nav">Nav links</div>
      </div>
    </header>
  );
}
