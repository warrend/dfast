import styles from './styles.css';

export const links = [{ rel: 'stylesheet', href: styles }];

export function Select({
  title,
  name,
  config,
  selected,
  width,
}: {
  title: string;
  name: string;
  config: { value: string; label: string }[];
  selected: string;
  width?: string;
}) {
  return (
    <div className="select" style={{ width: width ? width : '100%' }}>
      <label htmlFor={name}>{title}</label>
      <div className="select__wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 select__select-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>

        <select id={name} name={name}>
          {config.map(({ value, label }) => (
            <option selected={selected === value} value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
