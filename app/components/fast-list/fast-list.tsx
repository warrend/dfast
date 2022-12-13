import { useState } from 'react';
import styles from './styles.css';
import { objectKeys } from '~/helpers';
import { FastName, fastNameIcons, fastNameLabels } from '~/constants';
import { CircleIcon, links as circleIconLinks } from '../circle-icon';

export const links = () => [
  ...circleIconLinks(),
  { rel: 'stylesheet', href: styles },
];

export function FastList() {
  const [selectedFast, setSelectedFast] = useState<
    null | keyof typeof fastNameLabels
  >(null);

  function handleFastSelect(id: keyof typeof FastName) {
    setSelectedFast(FastName[id]);
  }

  return (
    <>
      {objectKeys(FastName).map((fastId) => (
        <div
          key={fastId}
          className={`fast-list__box ${
            selectedFast === FastName[fastId] ? 'fast-list__box--selected' : ''
          }`}
          onClick={() => handleFastSelect(fastId)}
        >
          <div className="fast-list__icon">
            <CircleIcon
              icon={fastNameIcons[FastName[fastId]]}
              backgroundColor="var(--primary200)"
            />
          </div>
          <div className="fast-list__name">
            {fastNameLabels[FastName[fastId]]}
          </div>
        </div>
      ))}
    </>
  );
}
