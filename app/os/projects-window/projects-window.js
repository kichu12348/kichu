import React from "react";
import { FaFileCode } from "react-icons/fa";
import styles from "./projects-window.module.css";
import projectStore from "../states/project";

function ProjectsWindow({ openWindow }) {
  const projects = projectStore((state) => state.projects);

  const handleProjectClick = (project) => {
    const windowId = `project-detail-${project.id}`;
    openWindow(windowId, project);
  };

  return (
    <div className={styles.projects}>
      <div className={styles.directoryHeader}>
        <div>Name</div>
        <div>Tech Stack</div>
        <div>Links</div>
        <div>Collaborators</div>
      </div>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.projectFile}
            onClick={() => handleProjectClick(project)}
          >
            <div className={styles.fileNameSection}>
              <div className={styles.fileIcon}>
                <FaFileCode className={styles.codeIcon} />
              </div>
              <div className={styles.fileInfo}>
                <div className={styles.fileName}>{project.title}</div>
                <div className={styles.projectDescription}>
                  {project.description}
                </div>
              </div>
            </div>
            <div className={styles.techStack}>
              {project.tech.slice(0, 3).join(", ")}
              {project.tech.length > 3 && "..."}
            </div>
            <div className={styles.linksCount}>
              {project.links.length} link{project.links.length !== 1 ? "s" : ""}
            </div>
            <div className={styles.collaboratorsCount}>
              {project.collaborators ? project.collaborators.length : 0}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerText}>
          {projects.length} file{projects.length !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}

export default ProjectsWindow;
