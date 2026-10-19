import type { Project } from '../../types/portfolio';
import { ProjectRow } from './ProjectRow';
import styles from './Projects.module.css';

export interface ProjectsListProps {
  readonly projects: readonly Project[];
  readonly activeIndex: number;
  readonly onSelectProject: (index: number) => void;
  readonly onOpenProject: (index: number) => void;
}

export function ProjectsList({
  projects,
  activeIndex,
  onSelectProject,
  onOpenProject,
}: ProjectsListProps) {
  return (
    <div>
      <h2 className={styles.sectionHeading}>things i made</h2>
      <div id="projects-list" className={styles.projectsList} role="list">
        {projects.map((proj, idx) => (
          <ProjectRow
            key={proj.id}
            project={proj}
            index={idx}
            isActive={idx === activeIndex}
            onSelect={onSelectProject}
            onOpen={onOpenProject}
          />
        ))}
      </div>
    </div>
  );
}
