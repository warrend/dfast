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
}: {
  type?: 'text' | 'textarea' | 'password';
  width?: string;
  name: string;
  label: string;
  placeholder: string;
  wrapperStyles?: CSSProperties;
}) {
  const inputProps = {
    className: 'input__input',
    type: type,
    id: name,
    name: name,
    style: { width },
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
    </div>
  );
}
