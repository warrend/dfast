import styles from './styles.css';

export const links = [{ rel: 'stylesheet', href: styles }];

type Props = {
  width: string;
  label: string;
  name: string;
  disabled: boolean;
  id: string;
  type: 'submit' | 'button';
};

export function Button({
  width = '100%',
  label,
  name,
  disabled = false,
  id,
  type = 'button',
}: Props) {
  return (
    <div style={{ width }} className="button__wrapper">
      <button disabled={disabled} id={id} name={name} type={type}>
        {label}
      </button>
    </div>
  );
}
