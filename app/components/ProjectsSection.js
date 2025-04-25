"use client";

import { motion } from "framer-motion";
import styles from "../page.module.css";
import { forwardRef } from "react";
import { Github, Globe } from "lucide-react";

const ProjectsSection = forwardRef((_, ref) => {
  const projects = [
    {
      title: "Vibelink – Where Vibes Connect",
      description: "A playful social media app designed to connect users through photos, thoughts, DMs, and private journaling. With a strong focus on personal expression and real-time interaction, it blends lighthearted features with powerful tech like encryption and real-time updates.",
      tech: ["React Native", "Expo", "Socket.io", "Expo Blur"],
      features: [
        "Photo & thought sharing with humor-forward UX",
        "Real-time DMs via Socket.io",
        "Private encrypted journaling for self-reflection",
        "Custom themes (Cyberpunk, Midnight Blue, Obsidian Black)"
      ],
      links: [
        {
          url: "https://github.com/kichu12348/vibelink",
          icon: Github,
          text: "GitHub"
        },{
          url: "https://vibelink.kichu.space",
          icon: Globe,
          text: "Learn More"
        }
      ]
    },
    {
      title: "SnapBook – Collaborative Digital Scrapbooking",
      description: "A real-time collaborative scrapbook app that turns memory-making into a digital art form. Users can create dreamy digital memory boards with drag, pinch, rotate, and animate capabilities—all while collaborating live with friends.",
      tech: ["React Native", "Expo", "Reanimated", "Socket.io", "Express.js"],
      features: [
        "Create scrapbooks with themed covers and custom quotes",
        "Freeform layout with animated, resizable elements",
        "Real-time collab with live editing via Socket.io",
        "Dreamy dark mode aesthetic with soft overlays"
      ],
      links: [
        {
          url: "https://github.com/kichu12348/snapbook",
          icon: Github,
          text: "GitHub"
        },
        {
          url: "https://snapbook.kichu.space",
          icon: Globe,
          text: "Learn More"
        }
      ]
    },
    {
      title: "UTSAV 2K25 – Interactive Arts Festival",
      description: "A cinematic web experience designed around a fictional arts festival set on Arrakis (inspired by Dune). It merges mythical storytelling, immersive visuals, and real-time interactivity through cutting-edge front-end techniques.",
      tech: ["React", "GSAP", "Three.js", "CSS Modules"],
      features: [
        "Animated 3D pyramid hero scene with particle effects",
        "Interactive house selection with gamified visuals",
        "Flip-card event showcase with scroll-triggered animation",
        "Live scoreboard system with dynamic counters"
      ],
      links: [
        {
          url: "https://github.com/kichu12348/dune_base",
          icon: Github,
          text: "GitHub"
        },
        {
          url: "https://utsav-2k25.vercel.app",
          icon: Globe,
          text: "Live Demo"
        }
      ]
    }
  ];

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
