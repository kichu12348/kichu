"use client";

import { motion } from "framer-motion";
import styles from "../page.module.css";
import { forwardRef } from "react";

const AboutSection = forwardRef((props, ref) => {
  return (
    <section id="about" ref={ref} className={styles.about}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.aboutContent}>
          <p>
            I&apos;m a passionate full-stack developer currently pursuing Computer
            Science Engineering at College of Engineering Chengannur. With
            expertise in modern web technologies and a strong foundation in
            systems programming, I build scalable, efficient solutions that
            solve real-world problems.
          </p>
          <p>
            My journey in software development began with a curiosity for how
            things work under the hood, leading me to explore everything from
            high-level web frameworks to low-level systems programming. This
            diverse background allows me to approach problems from multiple
            perspectives and choose the right tool for each job.
          </p>
        </div>
      </motion.div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
