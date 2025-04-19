"use client";

import { motion } from "framer-motion";
import styles from "../page.module.css";
import { forwardRef } from "react";

const EducationSection = forwardRef((props, ref) => {
  return (
    <section id="education" ref={ref} className={styles.education}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.timelineItem}>
          <div className={styles.timelineDot}></div>
          <div className={styles.timelineContent}>
            <h3>B.Tech in Computer Science Engineering</h3>
            <h4>College of Engineering Chengannur</h4>
            <p className={styles.timelinePeriod}>2023 - Present</p>
            <p>
              Focusing on algorithms, systems design, and full-stack
              development.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

EducationSection.displayName = "EducationSection";
export default EducationSection;
