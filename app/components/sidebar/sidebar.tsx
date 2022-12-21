import { fastTypes, fastTypeLabels } from '~/constants';
import { objectEntries } from '~/helpers';
import { Button, links as buttonLinks } from '../button';
import styles from './styles.css';

export const links = () => [
  ...buttonLinks(),
  { rel: 'stylesheet', href: styles },
];

type Props = {
  visible: boolean;
  setVisible: (arg: null) => void;
};

export function Sidebar({ visible, setVisible }: Props) {
  return (
    <>
      <div className={`sidebar ${visible && 'sidebar--visible'}`}>
        <h2>Fast Duration</h2>
        {objectEntries(fastTypes).map(([fastType, value]) => (
          <div key={fastType}>
            <h3>{fastTypeLabels[fastType]}</h3>
            <div>
              {objectEntries(value).map(([k, v]) => (
                <div key={k}>{v.label}</div>
              ))}
            </div>
          </div>
        ))}
        <div className="sidebar__button-row">
          <Button
            width="135px"
            label="Start"
            name="click"
            disabled={false}
            id="form"
            type="button"
          />
          <Button
            width="135px"
            label="Cancel"
            name="click"
            disabled={false}
            id="form"
            type="button"
            secondary
            onClick={() => setVisible(null)}
          />
        </div>
      </div>
      <div
        className={`${visible && 'sidebar__overlay'}`}
        onClick={() => setVisible(null)}
      ></div>
    </>
  );
}
