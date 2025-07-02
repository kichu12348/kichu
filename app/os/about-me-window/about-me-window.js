import React from "react";
import { AiOutlineUser, AiOutlineGithub, AiOutlineMail } from "react-icons/ai";
import { IoIdCardSharp } from "react-icons/io5";
import {
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiExpo,
  SiNodedotjs,
  SiDeno,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiPostgresql,
  SiSqlite,
  SiCloudflare,
  SiVercel,
  SiGooglecloud,
  SiJavascript,
  SiTypescript,
  SiRust,
  SiC,
  SiPython,
  SiFastapi,
  SiFlask,
  SiHono,
  SiSocketdotio,
  SiTauri,
  SiBun,
} from "react-icons/si";
import {
  FaAws,
  FaJava,
  FaCss3,
  FaHtml5,
  FaLinkedinIn,
  FaNpm,
} from "react-icons/fa";

import { TbBrandReactNative } from "react-icons/tb";
import styles from "./about-me-window.module.css";

function AboutMeWindow() {
  const skills = [
    "Frontend Development",
    "Backend Development",
    "Systems Programming",
    "Database Design",
    "Cloud Computing",
    "DevOps",
    "Cross-Platform Development",
    "Real-Time Applications",
  ];

  const techStack = [
    { name: "React", icon: <SiReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
    { name: "Three.js", icon: <SiThreedotjs />, color: "#000000" },
    { name: "CSS Modules", icon: <FaCss3 />, color: "#1572B6" },
    { name: "React Native", icon: <TbBrandReactNative />, color: "#61DAFB" },
    { name: "Expo", icon: <SiExpo />, color: "#000020" },
    { name: "Tauri", icon: <SiTauri />, color: "#000000" },
    { name: "GitHub", icon: <AiOutlineGithub />, color: "#181717" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "Deno", icon: <SiDeno />, color: "#000000" },
    { name: "Bun", icon: <SiBun />, color: "rgb(249 241 225)" },
    { name: "Express", icon: <SiExpress />, color: "#000000" },
    { name: "Hono", icon: <SiHono />, color: "#E36002" },
    { name: "Socket.io", icon: <SiSocketdotio />, color: "#010101" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
    { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
    { name: "SQLite", icon: <SiSqlite />, color: "#003B57" },
    { name: "Cloudflare Workers", icon: <SiCloudflare />, color: "#F38020" },
    { name: "Vercel", icon: <SiVercel />, color: "#000000" },
    { name: "AWS", icon: <FaAws />, color: "#FF9900" },
    { name: "Google Cloud", icon: <SiGooglecloud />, color: "#4285F4" },
    { name: "npm", icon: <FaNpm />, color: "#CB3837" },
    { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
    { name: "CSS", icon: <FaCss3 />, color: "#1572B6" },
    { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "Rust", icon: <SiRust />, color: "#000000" },
    { name: "C", icon: <SiC />, color: "#A8B9CC" },
    { name: "Java", icon: <FaJava />, color: "#007396" },
    { name: "Python", icon: <SiPython />, color: "#3776AB" },
    { name: "FastAPI", icon: <SiFastapi />, color: "#009688" },
    { name: "Flask", icon: <SiFlask />, color: "#000000" },
  ];

  return (
    <div className={styles.aboutMe}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <AiOutlineUser className={styles.avatarIcon} />
        </div>
        <div className={styles.basicInfo}>
          <h1 className={styles.name}>Mahadevan Reji</h1>
          <p className={styles.title}>Full Stack Developer</p>
          <p className={styles.subtitle}>Computer Science Engineering</p>
          <p className={styles.college}>College of Engineering Chengannur</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.bio}>
          <p className={styles.bioText}>
            I&apos;m a passionate full-stack developer with expertise in modern
            web technologies and a strong foundation in systems programming. I
            build scalable, efficient solutions that solve real-world problems.
          </p>
          <p className={styles.bioText}>
            My journey began with curiosity about how things work under the
            hood, leading me to explore everything from high-level frameworks to
            low-level systems programming.
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Skills</h3>
          <div className={styles.skillsList}>
            {skills.map((skill, index) => (
              <span key={index} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Technologies</h3>
          <div className={styles.techList}>
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={styles.tech}
                style={{ "--hover-color": tech.color }}
              >
                <span className={styles.techIcon}>{tech.icon}</span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <a
            href="https://github.com/kichu12348"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGithub className={styles.icon} />
          </a>
          <a
            href="https://www.linkedin.com/in/MahadevanReji"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className={styles.icon} />
          </a>
          <a
            href="mailto:rmahadevan574@gmail.com"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineMail className={styles.icon} />
          </a>
          <a
            className={styles.resumeButton}
            href="/resume/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoIdCardSharp className={styles.downloadIcon} />
            Resume
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutMeWindow;
