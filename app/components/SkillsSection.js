"use client";

import { motion } from "framer-motion";
import styles from "../page.module.css";
import { forwardRef } from "react";
import {
  Server,
  Database,
  Braces,
  Workflow,
  AppWindow,
  Globe,
  FileCode,
  BookOpen,
  Layers,
  Cpu,
  Terminal,
  Code,
} from "lucide-react";

const SkillsSection = forwardRef((props, ref) => {
  return (
    <section id="skills" ref={ref} className={styles.skills}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.sectionTitle}>Tech Stack</h2>

        <div className={styles.techStackContainer}>
          <div className={styles.stackCategory}>
            <div className={styles.categoryTitle}>
              <AppWindow size={20} />
              <h3>Frontend</h3>
            </div>
            <div className={styles.techCards}>
              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Braces size={24} />
                </div>
                <span>React</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Workflow size={24} />
                </div>
                <span>Next.js</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Layers size={24} />
                </div>
                <span>Three.js</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <FileCode size={24} />
                </div>
                <span>CSS Modules</span>
              </motion.div>
            </div>
          </div>

          <div className={styles.stackCategory}>
            <div className={styles.categoryTitle}>
              <Server size={20} />
              <h3>Backend</h3>
            </div>
            <div className={styles.techCards}>
              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Terminal size={24} />
                </div>
                <span>Node.js</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Server size={24} />
                </div>
                <span>Express</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Database size={24} />
                </div>
                <span>MongoDB</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Globe size={24} />
                </div>
                <span>Deno & Hono</span>
              </motion.div>
            </div>
          </div>

          <div className={styles.stackCategory}>
            <div className={styles.categoryTitle}>
              <Code size={20} />
              <h3>Languages</h3>
            </div>
            <div className={styles.techCards}>
              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Braces size={24} />
                </div>
                <span>JavaScript</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Cpu size={24} />
                </div>
                <span>Rust</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <Terminal size={24} />
                </div>
                <span>C</span>
              </motion.div>

              <motion.div className={styles.techCard} whileHover={{ y: -5 }}>
                <div className={styles.techIcon}>
                  <BookOpen size={24} />
                </div>
                <span>Java</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";
export default SkillsSection;
