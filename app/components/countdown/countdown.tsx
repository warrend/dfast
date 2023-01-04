import { useSubmit } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { allFastTypes } from '~/constants';
import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export function Countdown({
  id,
  size,
  onEnd,
  secondsRemaining,
  nameId,
  typeId,
}: {
  id: string;
  size?: string;
  onEnd: (id: string, nameId: string, typeId: string) => void;
  secondsRemaining: number;
  nameId: string;
  typeId: string;
}) {
  const submit = useSubmit();

  const [timeRemaining, setTimeRemaining] = useState(secondsRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeRemaining >= 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        onEnd(id, nameId, typeId);

        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemaining, submit, id, onEnd, nameId, typeId]);

  // const days = Math.floor(timeRemaining / 86400);
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  const fontSize = size ? { fontSize: size } : {};

  const ticker = (
    <div className="countdown__ticker" style={fontSize}>
      {/* {days > 0 && (
        <div className="countdown__ticker-section">
          <div>{days.toString().padStart(2, '0')}</div>
          <div>:</div>
        </div>
      )} */}
      <div className="countdown__ticker-section">
        <div>{hours.toString().padStart(2, '0')}</div>
        <div>:</div>
      </div>
      <div className="countdown__ticker-section">
        <div>{minutes.toString().padStart(2, '0')}</div>
        <div>:</div>
      </div>
      <div className="countdown__ticker-section">
        <div>{seconds.toString().padStart(2, '0')}</div>
      </div>
    </div>
  );

  const renderTickerText =
    timeRemaining < 0 ? (
      <div className="countdown__completed" style={fontSize}>
        completed!
      </div>
    ) : (
      ticker
    );

  return <div className="countdown">{renderTickerText}</div>;
}
