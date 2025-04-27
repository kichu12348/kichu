"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../page.module.css";
import { useEffect, useRef } from "react";
import { RiJavascriptLine } from "react-icons/ri";
import { FaReact } from "react-icons/fa6";
import { TbBrandNodejs } from "react-icons/tb";
import { IoMdGitMerge } from "react-icons/io";

export default function HeroSection() {
  // const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  const height = useRef(300); 
  
  const opacityTransform = useTransform(
    scrollY,
    [0, height.current], // this range is rn 0 to 300px ie the height of the hero section
    [1, 0]
  );
  
  const yPosTransform = useTransform(
    scrollY,
    [0, height.current], // this range is rn 0 to 300px ie the height of the hero section
    [0, -50]
  );

  useEffect(() => {
    const h1Element = document.querySelector('h1');
    if (h1Element) {
      h1Element.setAttribute('data-text', h1Element.textContent);
    }
    height.current=window.innerHeight; // set the height to the window height
    // const handleMouseMove = (e) => {
    //   if (heroRef.current) {
    //     const rect = heroRef.current.getBoundingClientRect();
    //     const x = ((e.clientX - rect.left) / rect.width);
    //     const y = ((e.clientY - rect.top) / rect.height);
    //     setParticlePosition({ x, y });
    //   }
    // };

    // window.addEventListener('mousemove', handleMouseMove);
    // return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Badge items
  const techBadges = [
    { icon: <RiJavascriptLine size={16} />, label: "JavaScript" },
    { icon: <FaReact size={16} />, label: "React" },
    { icon: <TbBrandNodejs size={16} />, label: "Node.js" },
    { icon: <IoMdGitMerge size={16} />, label: "Git" },
  ];

  return (
    <section ref={heroRef} className={styles.hero}>
      <motion.div
        style={{ opacity: opacityTransform, y: yPosTransform }}
        className={styles.heroContent}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.heroMainContent}
        >
          <h1>Mahadevan Reji</h1>
          <h2>Full Stack Developer</h2>
          
          <p className={styles.tagline}>
            Building the future, one line of code at a time
          </p>
          
          <div className={styles.heroButtons}>
            <motion.a
              href="#projects"
              className={styles.primaryButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className={styles.secondaryButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className={styles.floatingBadges}
        >
          {techBadges.map((badge, index) => (
            <motion.div
              key={index}
              className={styles.techBadge}
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 1.2 + index * 0.2 }
              }}
              whileHover={{ 
                y: -5, 
                scale: 1.1,
                boxShadow: "0 10px 25px rgba(var(--q-primary), 0.25)" 
              }}
            >
              {badge.icon}
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
