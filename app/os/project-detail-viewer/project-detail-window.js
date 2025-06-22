import React from "react";
import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import styles from "./project-detail-window.module.css";

function ProjectDetailWindow({ project }) {
  if (!project) {
    return (
      <div className={styles.projectDetail}>
        <div className={styles.loading}>Project not found</div>
      </div>
    );
  }

  const getIconComponent = (iconName) => {
    const iconMap = {
      Github: FaGithub,
      Linkedin: FaLinkedin,
      Info: IoMdInformationCircleOutline,
      ExternalLinkAlt: IoMdInformationCircleOutline,
      Globe: CiGlobe,
    };
    return iconMap[iconName] || IoMdInformationCircleOutline;
  };

  return (
    <div className={styles.projectDetail}>
      <div className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Tech Stack</h3>
          <div className={styles.techList}>
            {project.tech.map((tech, index) => (
              <span key={index} className={styles.techItem}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Features</h3>
          <div className={styles.featureList}>
            {project.features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Links</h3>
          <div className={styles.linkList}>
            {project.links.map((link, index) => {
              const IconComponent = getIconComponent(link.icon);
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <IconComponent className={styles.linkIcon} />
                  <span>{link.text}</span>
                </a>
              );
            })}
          </div>
        </div>

        {project.collaborators && project.collaborators.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Collaborators</h3>
            <div className={styles.collaboratorList}>
              {project.collaborators.map((collaborator, index) => (
                <div key={index} className={styles.collaborator}>
                  <span className={styles.collaboratorName}>
                    {collaborator.name}
                  </span>
                  <div className={styles.collaboratorLinks}>
                    {collaborator.uri.map((uriItem, uriIndex) => {
                      const IconComponent = getIconComponent(uriItem.icon);
                      return (
                        <a
                          key={uriIndex}
                          href={uriItem.uri}
                          id={uriItem.type}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.collaboratorLink}
                          title={uriItem.type}
                        >
                          <IconComponent />
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetailWindow;
