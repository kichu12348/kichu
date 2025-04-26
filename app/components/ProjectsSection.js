"use client";

import { motion } from "framer-motion";
import styles from "../page.module.css";
import { forwardRef } from "react";
import { Globe } from "lucide-react";
import { projects } from "./constants/projects";

const ProjectsSection = forwardRef((_, ref) => {
  return (
    <section id="projects" ref={ref} className={styles.projects}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.techTags}>
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex}>{tech}</span>
                ))}
              </div>
              <div className={styles.keyFeatures}>
                <h4>Key Features</h4>
                <ul>
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
              {project.collaborators && project.collaborators.length > 0 && (
                <div className={styles.collaborators}>
                  <h4>
                    Collaborator{project.collaborators.length > 1 ? "s" : ""}
                  </h4>
                  {project.collaborators.map((collab, collabIndex) => (
                    <div key={collabIndex} className={styles.collab}>
                      <p>{collab.name}</p>
                      <div className={styles.collabLinks}>
                        {collab.uri.map((uri, uriIndex) => (
                          <a
                            key={uriIndex}
                            href={uri.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <uri.icon size={18} />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.projectLinks}>
                {project.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link.icon === Globe ? styles.demoLink : ""}
                  >
                    <link.icon size={18} /> {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection"; // for debooging purposes
export default ProjectsSection;
