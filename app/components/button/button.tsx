import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

type Props = {
  width: string;
  label: string;
  name: string;
  disabled?: boolean | null;
  id: string;
  type: 'submit' | 'button';
  secondary?: boolean;
  onClick?: () => void;
};

export function Button({
  width = '100%',
  label,
  name,
  disabled,
  id,
  type = 'button',
  secondary = false,
  onClick,
}: Props) {
  const buttonDisabled = disabled || false;
  return (
    <div className="button__wrapper" style={{ width }}>
      <button
        disabled={buttonDisabled}
        id={id}
        name={name}
        type={type}
        className={`button__${secondary ? 'secondary' : 'standard'} `}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
