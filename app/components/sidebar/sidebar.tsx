import { useState, useContext, useEffect } from 'react';
import { Form } from '@remix-run/react';
import {
  fastTypes,
  fastTypeLabels,
  allFastNames,
  type allFastTypes,
} from '~/constants';
import { objectEntries } from '~/helpers';
import { FastContext } from '~/routes/dashboard/index';
import { Button, links as buttonLinks } from '../button';
import styles from './styles.css';

export const links = () => [
  ...buttonLinks(),
  { rel: 'stylesheet', href: styles },
];

type Props = {
  visible: boolean;
  setVisible: (arg: null) => void;
  selectedFast: null | keyof typeof allFastNames;
};

export function Sidebar({ visible, setVisible, selectedFast }: Props) {
  const [group, setGroup] = useState<keyof typeof fastTypes>('micro');
  const [fastType, setFastType] = useState<null | keyof typeof allFastTypes>(
    null
  );

  const [duration, setDuration] = useState(0);
  const fastData = useContext(FastContext);

  useEffect(() => {
    if (fastData.actionData?.status === 200) {
      setVisible(null);
    }
  }, [fastData.actionData, setVisible]);

  function handleSetFast(id: keyof typeof allFastTypes, mins: number) {
    setFastType(id);
    setDuration(mins);
  }

  function handleCancel() {
    setFastType(null);
    setVisible(null);
  }

  return (
    <>
      <div className={`sidebar ${visible && 'sidebar--visible'}`}>
        <Form method="post" id="form" action="/dashboard?index">
          <input type="hidden" name="fastType" defaultValue={fastType || ''} />
          <input
            type="hidden"
            name="fastName"
            defaultValue={selectedFast || ''}
          />
          <input type="hidden" name="duration" defaultValue={duration || ''} />

          <div className="sidebar__header">
            <h1>{selectedFast && allFastNames[selectedFast]} Fast</h1>
            <div className="sidebar__button-row">
              <Button
                width="100px"
                label="Start"
                name="click"
                disabled={fastType === null}
                id="form"
                type="submit"
              />
              <Button
                width="100px"
                label="Cancel"
                name="click"
                id="form"
                type="button"
                secondary
                onClick={() => handleCancel()}
              />
            </div>
          </div>
          <h2>Select Fast Group</h2>

          <div className="sidebar__fast-group-chip-wrapper">
            {objectEntries(fastTypes).map(([fastType, value]) => (
              <div
                key={fastType}
                className="sidebar__fast-group-chip"
                onClick={() => setGroup(fastType)}
                style={{
                  background:
                    group === fastType
                      ? 'var(--accent200)'
                      : 'var(--accent100)',
                }}
              >
                <div>{fastTypeLabels[fastType]}</div>
              </div>
            ))}
            <div className="sidebar__fast-type-group">
              <h2>Select Fast Duration</h2>

              {objectEntries(fastTypes[group]).map(([k, v]) => (
                <div
                  className="sidebar__fast-type"
                  key={k}
                  onClick={() => handleSetFast(k, v.duration)}
                  style={{
                    background:
                      fastType === k ? 'var(--accent200)' : 'var(--grey200)',
                  }}
                >
                  {v.label}
                </div>
              ))}
            </div>
          </div>
        </Form>
      </div>
      <div
        className={`${visible && 'sidebar__overlay'}`}
        onClick={() => setVisible(null)}
      ></div>
    </>
  );
}
