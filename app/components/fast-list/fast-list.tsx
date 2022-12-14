import styles from './styles.css';
import { objectKeys } from '~/helpers';
import { FastName, fastNameIcons, fastNameLabels } from '~/constants';
import { CircleIcon, links as circleIconLinks } from '../circle-icon';

export const links = () => [
  ...circleIconLinks(),
  { rel: 'stylesheet', href: styles },
];

type Props = {
  selectedFast: null | keyof typeof fastNameLabels;
  setSelectedFast: (arg: null | keyof typeof fastNameLabels) => void;
};

export function FastList({ selectedFast, setSelectedFast }: Props) {
  function handleFastSelect(id: keyof typeof FastName) {
    if (FastName[id] === selectedFast) {
      setSelectedFast(null);
    } else {
      setSelectedFast(FastName[id]);
    }
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
