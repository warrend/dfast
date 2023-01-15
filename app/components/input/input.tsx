import { type CSSProperties } from 'react';
import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export function Input({
  type = 'text',
  width,
  name,
  label,
  placeholder,
  wrapperStyles,
  error,
}: {
  type?: 'text' | 'textarea' | 'password' | 'email';
  width?: string;
  name: string;
  label: string;
  placeholder: string;
  wrapperStyles?: CSSProperties;
  error?: string;
}) {
  const inputProps = {
    className: 'input__input',
    type: type,
    id: name,
    name: name,
    style: { width, border: error ? '2px solid var(--error300)' : 'none' },
    placeholder: placeholder,
  };
  return (
    <div className="input" style={wrapperStyles}>
      <label htmlFor={name}>{label}</label>
      {type !== 'textarea' ? (
        <input {...inputProps} />
      ) : (
        <textarea {...inputProps} rows={4} />
      )}
      {error && <div className="input__error-message">{error}</div>}
    </div>
  );
}
