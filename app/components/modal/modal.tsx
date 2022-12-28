import { useEffect } from 'react';
import { type Fast } from '~/server/db.server';
import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

type Props = {
  visible: boolean;
  onClose: (arg: boolean) => void;
  currentFastSelected: Fast | null;
};

export function Modal({ visible, onClose, currentFastSelected }: Props) {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);

  return (
    <>
      <div className={`modal ${visible && 'modal--visible'}`}>
        {JSON.stringify(currentFastSelected, null, 2)}
      </div>
      <div className={`${visible && 'modal__overlay'}`}></div>
    </>
  );
}
