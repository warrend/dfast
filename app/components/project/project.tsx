import styles from './styles.css';
import { type Project as TProject } from '~/server/db.server';

export const links = [{ rel: 'stylesheet', href: styles }];

export function Project({ project }: { project: TProject }) {
  const {
    publication,
    title,
    category,
    createdAt,
    status,
    description,
    history,
    editor,
  } = project;
  return (
    <div className="project">
      <div className="project__wrapper-content">
        <div className="project__header">
          <div className="project__status">{status}</div>
          <div className="project__status-bar">
            {createdAt} • {publication}, {editor.name}
          </div>
        </div>
        <div className="project__body">
          <div className="project__title">{title}</div>
          <div className="project__description">{description}</div>
        </div>
        <div className="project__update-action"></div>
      </div>
      <div className="project__wrapper-history">
        {history.map(({ status, updatedAt }) => (
          <div key={status} className="project__history">
            <div className="project__history-date">{updatedAt}</div>
            <div className="project__history-status">{status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
