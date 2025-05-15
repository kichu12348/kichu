"use client";

import { motion } from "framer-motion";
import styles from "../page.module.css";
import { forwardRef } from "react";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

const ContactSection = forwardRef((props, ref) => {
  return (
    <section id="contact" ref={ref} className={styles.contact}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <p className={styles.contactText}>
          I&apos;m always open to discussing new projects, opportunities, or
          partnerships. Feel free to reach out through any of the platforms
          below.
        </p>
        <div className={styles.contactLinks}>
          <a
            href="mailto:rmahadevan574@gmail.com"
            className={styles.contactLink}
          >
            <Mail /> rmahadevan574@gmail.com
          </a>
          <a
            href="https://github.com/kichu12348"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <Github /> github.com/kichu12348
          </a>
          <a
            href="https://linkedin.com/in/MahadevanReji"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <Linkedin /> linkedin.com/in/MahadevanReji
          </a>
          <a
            href="/resume/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactLink} quant-cursor`}
          >
            <FileText /> View Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
