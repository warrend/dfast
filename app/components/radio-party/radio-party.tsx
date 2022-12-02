import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

type Props = {
  name: string;
  config: {
    value: string;
    label: string;
  }[];
};

export function RadioParty({ name, config }: Props) {
  return (
    <div className="radio-party">
      {config.map(({ value, label }) => (
        <div key={value} className="radio-party__wrapper">
          <input type="radio" name={name} value={value} id={name} />
          <label htmlFor={name} key={value} className="radio-party__wrapper">
            {label}
          </label>
        </div>
      ))}
    </div>
  );
}
