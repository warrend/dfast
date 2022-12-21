import { useState, useEffect } from 'react';
import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export function Countdown({
  fastEndISODate,
  size,
}: {
  fastEndISODate: string;
  size?: number;
}) {
  const [timeRemaining, setTimeRemaining] = useState(
    (Date.parse(fastEndISODate) - new Date().getTime()) / 1000
  );

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  const days = Math.floor(timeRemaining / 86400);
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  const fontSize = size ? { fontSize: `${size}px` } : {};

  const ticker = (
    <div className="countdown__ticker" style={fontSize}>
      {days > 0 && (
        <div className="countdown__ticker-section">
          <div>{days.toString().padStart(2, '0')}</div>
          <div>:</div>
        </div>
      )}
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
    timeRemaining <= 0 ? (
      <div className="countdown__completed">completed!</div>
    ) : (
      ticker
    );

  return <div className="countdown">{renderTickerText}</div>;
}
