"use client";

import { motion } from "framer-motion";
import styles from "../styles/Skills.module.css";
import { forwardRef } from "react";
import { Server, AppWindow, FileCode, Terminal, Code } from "lucide-react";
import {
  SiDeno,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiHono,
  SiMongodb,
  SiPostgresql,
  SiRust,
  SiThreedotjs,
} from "react-icons/si";
import {
  RiGithubLine,
  RiJavascriptLine,
  RiNextjsLine,
  RiSupabaseLine,
} from "react-icons/ri";
import { TbBrandNodejs, TbBrandReactNative, TbBrandTypescript } from "react-icons/tb";
import { FaJava, FaReact } from "react-icons/fa6";


const skillCategories = [
  {
    title: "Frontend",
    icon: <AppWindow size={20} />,
    techItems: [
      { name: "React", icon: <FaReact size={24} /> },
      { name: "Next.js", icon: <RiNextjsLine size={24} /> },
      { name: "Three.js", icon: <SiThreedotjs size={24} /> },
      { name: "CSS Modules", icon: <FileCode size={24} /> },
      { name: "React Native", icon: <TbBrandReactNative size={24} /> },
      { name: "Expo", icon: <SiExpo size={24} /> },
      { name: "GitHub", icon: <RiGithubLine size={24} /> },
    ],
  },
  {
    title: "Backend",
    icon: <Server size={20} />,
    techItems: [
      { name: "Node.js", icon: <TbBrandNodejs size={24} /> },
      { name: "Deno", icon: <SiDeno size={24} /> },
      { name: "Express", icon: <SiExpress size={24} /> },
      { name: "Hono", icon: <SiHono size={24} /> },
      { name: "MongoDB", icon: <SiMongodb size={24} /> },
      { name: "Firebase", icon: <SiFirebase size={24} /> },
      { name: "Supabase", icon: <RiSupabaseLine size={24} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={24} /> },
    ],
  },
  {
    title: "Languages",
    icon: <Code size={20} />,
    techItems: [
      { name: "JavaScript", icon: <RiJavascriptLine size={24} /> },
      { name: "TypeScript", icon: <TbBrandTypescript size={24} /> },
      { name: "Rust", icon: <SiRust size={24} /> },
      { name: "C", icon: <Terminal size={24} /> },
      { name: "Java", icon: <FaJava size={24} /> },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const SkillsSection = forwardRef((_, ref) => {
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
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className={styles.stackCategory}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={styles.categoryTitle}>
                {category.icon}
                <h3>{category.title}</h3>
              </div>
              <motion.div
                className={styles.techCards}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {category.techItems.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    className={styles.techCard}
                    variants={itemVariants}
                    whileHover={{
                      y: -8,
                      scale: 1.08,
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={styles.techIcon}>{tech.icon}</div>
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";
export default SkillsSection;
