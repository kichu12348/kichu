"use client";

import styles from "../page.module.css";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function SocialLinks({ hidden, cyberpunkMode }) {
  return (
    <div className={`${styles.socials} ${hidden ? styles.hidden : ""}`}>
      <a
        href="https://github.com/kichu12348"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github 
          className={styles.socialIcon}
          size={24}
          color={cyberpunkMode ? "#ffffff" : "#000000"}
        />
      </a>
      <a
        href="https://linkedin.com/in/MahadevanReji"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin 
          className={styles.socialIcon}
          size={24}
          color={cyberpunkMode ? "#ffffff" : "#000000"}
        />
      </a>
      <a href="mailto:rmahadevan574@gmail.com">
        <Mail 
          className={styles.socialIcon}
          size={24}
          color={cyberpunkMode ? "#ffffff" : "#000000"}
        />
      </a>
      <a 
        href="/resume/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileText 
          className={styles.socialIcon}
          size={24}
          color={cyberpunkMode ? "#ffffff" : "#000000"}
        />
      </a>
    </div>
  );
}
