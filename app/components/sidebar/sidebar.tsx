import { useState } from 'react';
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
  const [group, setGroup] = useState<keyof typeof fastTypes>('micro');

  function onHandleChip(id: keyof typeof fastTypes) {
    setGroup(id);
  }

  return (
    <>
      <div className={`sidebar ${visible && 'sidebar--visible'}`}>
        <h2>Select Fast Group</h2>
        <div className="sidebar__fast-group-chip-wrapper">
          {objectEntries(fastTypes).map(([fastType, value]) => (
            <div
              key={fastType}
              className="sidebar__fast-group-chip"
              onClick={() => onHandleChip(fastType)}
              style={{
                background:
                  group === fastType ? 'var(--accent200)' : 'var(--accent100)',
              }}
            >
              <div>{fastTypeLabels[fastType]}</div>
            </div>
          ))}
          <div className="sidebar__fast-type-group">
            <h2>Select Fast Duration</h2>

            {objectEntries(fastTypes[group]).map(([k, v]) => (
              <div className="sidebar__fast-type" key={k}>
                {v.label}
              </div>
            ))}
          </div>
        </div>
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
