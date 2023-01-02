import styles from './styles.css';
import { objectEntries } from '~/helpers';
import {
  fastNameIcons,
  fasts,
  fastCategoryLabels,
  type allFastNames,
} from '~/constants';
import { CircleIcon, links as circleIconLinks } from '../circle-icon';
import { Fast } from '~/server/db.server';

export const links = () => [
  ...circleIconLinks(),
  { rel: 'stylesheet', href: styles },
];

type Props = {
  selectedFast: null | keyof typeof allFastNames;
  setSelectedFast: (arg: null | keyof typeof allFastNames) => void;
  currentFasts: Fast[];
};

export function FastList({
  selectedFast,
  setSelectedFast,
  currentFasts,
}: Props) {
  const fastNameKeys = currentFasts.reduce(
    (acc: { [key: string]: boolean }, curr: Fast) => {
      acc[curr.nameId] = true;
      return acc;
    },
    {}
  );

  function handleFastSelect(id: keyof typeof allFastNames) {
    if (id === selectedFast) {
      setSelectedFast(null);
    } else {
      setSelectedFast(id);
    }
  }

  return (
    <>
      {objectEntries(fasts).map(([fastId, fastList]) => (
        <div key={fastId} className="fast-list">
          <h3>{fastCategoryLabels[fastId]}</h3>
          <div className="fast-list__group">
            {objectEntries(fastList).map(([k, v]) => {
              const inProgress = k in fastNameKeys;
              return (
                <div
                  key={k}
                  className={`fast-list__box ${
                    selectedFast === k ? 'fast-list__box--selected' : ''
                  }`}
                  onClick={() => !inProgress && handleFastSelect(k)}
                  style={{
                    opacity: inProgress ? '.5' : '1',
                    cursor: inProgress ? 'initial' : 'pointer',
                  }}
                >
                  <div className="fast-list__icon">
                    <CircleIcon
                      icon={fastNameIcons[k]}
                      backgroundColor="var(--primary100)"
                    />
                  </div>
                  <div className="fast-list__name">{v}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
