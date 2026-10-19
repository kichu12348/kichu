import type { KeyboardEvent } from 'react';
import type { Project } from '../../types/portfolio';
import styles from './Projects.module.css';

export interface ProjectRowProps {
  readonly project: Project;
  readonly index: number;
  readonly isActive: boolean;
  readonly onSelect: (index: number) => void;
  readonly onOpen: (index: number) => void;
}

export function ProjectRow({
  project,
  index,
  isActive,
  onSelect,
  onOpen,
}: ProjectRowProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(index);
    }
  };

  return (
    <div
      className={`${styles.projectRow} ${isActive ? styles.active : ''}`}
      data-index={index}
      tabIndex={0}
      role="listitem"
      onMouseEnter={() => onSelect(index)}
      onFocus={() => onSelect(index)}
      onClick={() => {
        onSelect(index);
        onOpen(index);
      }}
      onKeyDown={handleKeyDown}
      aria-label={`${project.name}: ${project.desc}`}
    >
      <span className={styles.projName}>{project.name}</span>
      <span className={styles.projDash}>—</span>
      <span className={styles.projDesc}>{project.desc}</span>
      <span className={styles.projArrow} aria-hidden="true">
        →
      </span>
    </div>
  );
}
