import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export function Select({
  title,
  name,
  config,
  defaultValue,
  width,
}: {
  title: string;
  name: string;
  config: { value: string; label: string }[];
  defaultValue: string;
  width?: string;
}) {
  return (
    <div className="select" style={{ width: width ? width : '100%' }}>
      <label htmlFor={name}>{title}</label>
      <div className="select__wrapper">
        <select id={name} name={name} defaultValue={defaultValue}>
          {config.map(({ value, label }) => (
            <option selected={value === defaultValue} value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
