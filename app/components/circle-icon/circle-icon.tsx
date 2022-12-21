import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export function CircleIcon({
  icon,
  backgroundColor = 'var(--primary50)',
}: {
  icon: React.ReactNode;
  backgroundColor: string;
}) {
  return (
    <span className="circle-icon" style={{ backgroundColor }}>
      {icon}
    </span>
  );
}
