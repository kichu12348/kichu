"use client";

import { motion } from "framer-motion";
import pageStyles from "../page.module.css"; 
import projectStyles from "../styles/Project.module.css";
import { forwardRef } from "react";
import { Globe } from "lucide-react";
import { projects } from "./constants/projects";
import SwipeList from "./utils/swipeList";

const ProjectsSection = forwardRef((_, ref) => {





  const renderItem=(item, index) => {
    return (
      <div key={index} className={projectStyles.projectCard}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className={projectStyles.techTags}>
          {item.tech.map((tech, techIndex) => (
            <span key={techIndex}>{tech}</span>
          ))}
        </div>
        <div className={projectStyles.keyFeatures}>
          <h4>Key Features</h4>
          <ul>
            {item.features.map((feature, featureIndex) => (
              <li key={featureIndex}>{feature}</li>
            ))}
          </ul>
        </div>
        {item.collaborators && item.collaborators.length > 0 && (
          <div className={projectStyles.collaborators}>
            <h4>
              Collaborator{item.collaborators.length > 1 ? "s" : ""}
            </h4>
            {item.collaborators.map((collab, collabIndex) => (
              <div key={collabIndex} className={projectStyles.collab}>
                <p>{collab.name}</p>
                <div className={projectStyles.collabLinks}>
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
        <div className={projectStyles.projectLinks}>
          {item.links.map((link, linkIndex) => (
            <a
              key={linkIndex}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                link.icon === Globe ? projectStyles.demoLink : ""
              }
            >
              <link.icon size={18} /> {link.text}
            </a>
          ))}
        </div>
      </div>
    );
  }











  return (
    <section id="projects" ref={ref} className={projectStyles.projects}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={pageStyles.sectionTitle}>Featured Projects</h2>
        <div className={projectStyles.projectsGrid}>
          <SwipeList
            data={projects}
            renderItem={renderItem}
            renderEmpty={() => <div>No projects available</div>}
            KeyExtractor={(item,index) => index}
            dotColor="rgba(142, 70, 186)"
            dotActiveColor="#000"
            dotSize="20px"
            autoplay={true}
            autoplayDelay={3000}
            />
          {/* {projects.map((project, index) => (
            <div key={index} className={projectStyles.projectCard}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={projectStyles.techTags}>
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex}>{tech}</span>
                ))}
              </div>
              <div className={projectStyles.keyFeatures}>
                <h4>Key Features</h4>
                <ul>
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
              {project.collaborators && project.collaborators.length > 0 && (
                <div className={projectStyles.collaborators}>
                  <h4>
                    Collaborator{project.collaborators.length > 1 ? "s" : ""}
                  </h4>
                  {project.collaborators.map((collab, collabIndex) => (
                    <div key={collabIndex} className={projectStyles.collab}>
                      <p>{collab.name}</p>
                      <div className={projectStyles.collabLinks}>
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
              <div className={projectStyles.projectLinks}>
                {project.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link.icon === Globe ? projectStyles.demoLink : ""}
                  >
                    <link.icon size={18} /> {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))} */}
        </div>
      </motion.div>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection"; // for debooging purposes
export default ProjectsSection;
