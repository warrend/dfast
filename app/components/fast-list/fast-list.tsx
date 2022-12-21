import styles from './styles.css';
import { objectEntries } from '~/helpers';
import { fastNameIcons, fasts, fastCategoryLabels } from '~/constants';
import { CircleIcon, links as circleIconLinks } from '../circle-icon';

export const links = () => [
  ...circleIconLinks(),
  { rel: 'stylesheet', href: styles },
];

type Props = {
  selectedFast: null | keyof typeof fasts;
  setSelectedFast: (arg: null | keyof typeof fasts) => void;
};

export function FastList({ selectedFast, setSelectedFast }: Props) {
  function handleFastSelect(id: keyof typeof fasts) {
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
              return (
                <div
                  key={k}
                  className={`fast-list__box ${
                    selectedFast === k ? 'fast-list__box--selected' : ''
                  }`}
                  onClick={() => handleFastSelect(k)}
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
