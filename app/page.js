"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
// import { Github, Linkedin, Mail, Globe, Database, Code, Server } from "lucide-react";
import styles from "./page.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MathUtils, Vector3, BufferGeometry, Color } from "three";
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
  BarChart,
  Terminal,
  Code,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import QuantumCursor from "./quantum-cursor";
import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

gsap.registerPlugin(ScrollTrigger);

function NeuralNetwork({ sectionColors }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate random points in a sphere volume
  const points = useMemo(() => {
    const count = 100;
    const points = [];
    const radius = 3;

    for (let i = 0; i < count; i++) {
      // Random spherical coordinates
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random()); // Cube root for even distribution

      // Convert to cartesian
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      points.push(new Vector3(x, y, z));
    }

    return points;
  }, []);

  // Generate connections between nearby points
  const connections = useMemo(() => {
    const connections = [];
    const maxDistance = 1.5;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < maxDistance) {
          connections.push({
            start: points[i],
            end: points[j],
            distance: dist,
            index: connections.length,
          });
        }
      }
    }

    return connections;
  }, [points]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    const scroll = scrollY.current;
    const pointPositions = pointsRef.current.geometry.attributes.position.array;
    const pointSizes = pointsRef.current.geometry.attributes.size.array;
    const pointColors = pointsRef.current.geometry.attributes.color.array;

    for (let i = 0; i < points.length; i++) {
      const i3 = i * 3;
      const point = points[i];

      const breatheFactor = Math.sin(time * 0.5 + i * 0.1) * 0.05;

      pointPositions[i3] = point.x * (1 + breatheFactor);
      pointPositions[i3 + 1] = point.y * (1 + breatheFactor);
      pointPositions[i3 + 2] = point.z * (1 + breatheFactor);

      const distFromCenter = point.length();

      const phase =
        (scroll * 15 - distFromCenter * 2 + time * 1.5) % (2 * Math.PI);
      const activation = Math.pow((Math.cos(phase) + 1) / 2, 2);

      pointSizes[i] = 0.08 + activation * 0.35;

      let baseColor = new Color(sectionColors.baseColor);
      let activeColor = new Color(sectionColors.activeColor);

      const finalColor = baseColor.clone().lerp(activeColor, activation);
      pointColors[i3] = finalColor.r;
      pointColors[i3 + 1] = finalColor.g;
      pointColors[i3 + 2] = finalColor.b;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;

    // Update lines with more striking activation effects
    const linePositions = linesRef.current.geometry.attributes.position.array;
    const lineColors = linesRef.current.geometry.attributes.color.array;

    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];
      const i6 = i * 6;

      const startIdx = points.indexOf(connection.start) * 3;
      const endIdx = points.indexOf(connection.end) * 3;

      linePositions[i6] = pointPositions[startIdx];
      linePositions[i6 + 1] = pointPositions[startIdx + 1];
      linePositions[i6 + 2] = pointPositions[startIdx + 2];

      linePositions[i6 + 3] = pointPositions[endIdx];
      linePositions[i6 + 4] = pointPositions[endIdx + 1];
      linePositions[i6 + 5] = pointPositions[endIdx + 2];

      const phase =
        (scroll * 15 - connection.distance * 3 + time * 1.5) % (2 * Math.PI);
      const activation = Math.pow((Math.cos(phase) + 1) / 2, 1.5);

      let baseColor = new Color(sectionColors.baseColor);
      let activeColor = new Color(sectionColors.activeColor);

      const finalColor = baseColor.clone().lerp(activeColor, activation);

      const i12 = i * 12;
      for (let j = 0; j < 2; j++) {
        const j3 = j * 3;
        lineColors[i12 + j3] = finalColor.r;
        lineColors[i12 + j3 + 1] = finalColor.g;
        lineColors[i12 + j3 + 2] = finalColor.b;
      }
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;

    // Gentle rotation that speeds up with scroll
    const rotationSpeed = 0.05 + scroll * 0.1;
    pointsRef.current.rotation.y += rotationSpeed * 0.01;
    linesRef.current.rotation.y += rotationSpeed * 0.01;
  });

  return (
    <group>
      {/* Points with glow */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.length * 3)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={points.length}
            array={new Float32Array(points.length)}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={points.length}
            array={new Float32Array(points.length * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} sizeAttenuation vertexColors />
      </points>

      {/* Connections with enhanced visibility */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length * 2}
            array={new Float32Array(connections.length * 6)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={connections.length * 2}
            array={new Float32Array(connections.length * 6)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" vertexColors linewidth={2} />
      </lineSegments>
    </group>
  );
}

export default function Home() {
  const containerRef = useRef();
  const aboutSectionRef = useRef();
  const skillsSectionRef = useRef();
  const projectsSectionRef = useRef();
  const educationSectionRef = useRef();
  const contactSectionRef = useRef();

  const [activeSection, setActiveSection] = useState("hero");
  const [quantumState, setQuantumState] = useState(0);
  const [sectionColors, setSectionColors] = useState({
    baseColor: "#f0f0ff",
    activeColor: "#dc5ac5"
  });
  const [cyberpunkMode, setCyberpunkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / height;
     // document.head.querySelector('meta[name="theme-color"]').setAttribute('content', quantumState === 3 ? 'rgb(248, 250, 252)' : "rgb(18, 24, 38)");
      
      if (scrollPercentage < 0.2) {
        setQuantumState(0);
      } else if (scrollPercentage < 0.5) {
        setQuantumState(1);
      } else if (scrollPercentage < 0.8) {
        setQuantumState(2);
        document.head.querySelector('meta[name="theme-color"]').setAttribute('content', 'rgb(248, 250, 252)');
      } else {
        document.head.querySelector('meta[name="theme-color"]').setAttribute('content', 'rgb(18, 24, 38)');
        setQuantumState(3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-quantum-state', quantumState);

    const colors = {
      0: {
        baseColor: "#0c0f1a", 
        activeColor: "#dc5ac5"
      },
      1: {
        baseColor: "#0c0f1a", 
        activeColor: "#67e8f9"
      },
      2: {
        baseColor: "#0c0f1a", 
        activeColor: "#8fdaa0"
      },
      3: {
        baseColor: "#0c1220", 
        activeColor: "#d55efc"
      }
    };
    
    setSectionColors(colors[quantumState]);
  }, [quantumState]);

  useEffect(() => {
    const sections = [
      { id: "hero", ref: containerRef },
      { id: "about", ref: aboutSectionRef },
      { id: "skills", ref: skillsSectionRef },
      { id: "projects", ref: projectsSectionRef },
      { id: "education", ref: educationSectionRef },
      { id: "contact", ref: contactSectionRef }
    ];

    const observers = sections.map(section => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.3 }
      );
      
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
      
      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const h1Element = document.querySelector('h1');
    if (h1Element) {
      h1Element.setAttribute('data-text', h1Element.textContent);
    }

    const h2Element = document.querySelector('h2');
    if (h2Element) {
      h2Element.addEventListener('mousemove', (e) => {
        const rect = h2Element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        h2Element.style.setProperty('--x', `${x}%`);
        h2Element.style.setProperty('--y', `${y}%`);
      });
    }
  }, []);

  return (
    <main
      ref={containerRef}
      className={styles.container}
      data-quantum-state={quantumState}
    >
      <QuantumCursor />
      
      <div className={styles.background}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <NeuralNetwork sectionColors={sectionColors} />
            <EffectComposer>
              <Bloom intensity={0.6} luminanceThreshold={0.2} />
            </EffectComposer>
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={true}
            autoRotateSpeed={0.2}
          />
        </Canvas>
      </div>

      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.heroContent}
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
      </section>

      <section id="about" ref={aboutSectionRef} className={styles.about}>
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

      <section id="skills" ref={skillsSectionRef} className={styles.skills}>
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

      <section
        id="projects"
        ref={projectsSectionRef}
        className={styles.projects}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.projectsGrid}>
            {/* Vibelink Project */}
            <div className={styles.projectCard}>
              <h3>Vibelink – Where Vibes Connect</h3>
              <p>
                A playful social media app designed to connect users through photos, thoughts, DMs, and private journaling. 
                With a strong focus on personal expression and real-time interaction, it blends lighthearted features with 
                powerful tech like encryption and real-time updates.
              </p>
              <div className={styles.techTags}>
                <span>React Native</span>
                <span>Expo</span>
                <span>Socket.io</span>
                <span>Expo Blur</span>
              </div>
              <div className={styles.keyFeatures}>
                <h4>Key Features</h4>
                <ul>
                  <li>Photo & thought sharing with humor-forward UX</li>
                  <li>Real-time DMs via Socket.io</li>
                  <li>Private encrypted journaling for self-reflection</li>
                  <li>Custom themes (Cyberpunk, Midnight Blue, Obsidian Black)</li>
                </ul>
              </div>
              <div className={styles.projectLinks}>
                <a
                  href="https://github.com/kichu12348/vibelink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} /> GitHub Repo
                </a>
              </div>
            </div>

            {/* SnapBook Project */}
            <div className={styles.projectCard}>
              <h3>SnapBook – Collaborative Digital Scrapbooking</h3>
              <p>
                A real-time collaborative scrapbook app that turns memory-making into a digital art form. 
                Users can create dreamy digital memory boards with drag, pinch, rotate, and animate capabilities—all 
                while collaborating live with friends.
              </p>
              <div className={styles.techTags}>
                <span>React Native</span>
                <span>Expo</span>
                <span>Reanimated</span>
                <span>Socket.io</span>
                <span>Express.js</span>
              </div>
              <div className={styles.keyFeatures}>
                <h4>Key Features</h4>
                <ul>
                  <li>Create scrapbooks with themed covers and custom quotes</li>
                  <li>Freeform layout with animated, resizable elements</li>
                  <li>Real-time collab with live editing via Socket.io</li>
                  <li>Dreamy dark mode aesthetic with soft overlays</li>
                </ul>
              </div>
              <div className={styles.projectLinks}>
                <a
                  href="https://github.com/kichu12348/snapbook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} /> GitHub Repo
                </a>
              </div>
            </div>

            {/* UTSAV 2K25 Project */}
            <div className={styles.projectCard}>
              <h3>UTSAV 2K25 – Interactive Arts Festival</h3>
              <p>
                A cinematic web experience designed around a fictional arts festival set on Arrakis (inspired by Dune). 
                It merges mythical storytelling, immersive visuals, and real-time interactivity through cutting-edge 
                front-end techniques.
              </p>
              <div className={styles.techTags}>
                <span>React</span>
                <span>GSAP</span>
                <span>Three.js</span>
                <span>CSS Modules</span>
              </div>
              <div className={styles.keyFeatures}
              >
                <h4>Key Features</h4>
                <ul>
                  <li>Animated 3D pyramid hero scene with particle effects</li>
                  <li>Interactive house selection with gamified visuals</li>
                  <li>Flip-card event showcase with scroll-triggered animation</li>
                  <li>Live scoreboard system with dynamic counters</li>
                </ul>
              </div>
              <div className={styles.projectLinks}>
                <a
                  href="https://github.com/kichu12348/dune_base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} /> GitHub Repo
                </a>
                <a 
                  href="https://utsav-2k25.vercel.app" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className={styles.demoLink}
                >
                  <Globe size={18} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        id="education"
        ref={educationSectionRef}
        className={styles.education}
      >
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

      <section id="contact" ref={contactSectionRef} className={styles.contact}>
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
          </div>
        </motion.div>
      </section>

      <div className={`${styles.socials} ${activeSection === "contact" ? styles.hidden : ""}`}>
        <a
          href="https://github.com/kichu12348"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github 
            className={styles.socialIcon}
            size={24}
            color={activeSection==="education" ? "#ffffff" : "#000000"}
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
            color={activeSection==="education" ? "#ffffff" : "#000000"}
          />
        </a>
        <a href="mailto:rmahadevan574@gmail.com">
          <Mail 
            className={styles.socialIcon}
            size={24}
            color={activeSection==="education" ? "#ffffff" : "#000000"}
          />
        </a>
      </div>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Mahadevan Reji. All rights reserved.
        </p>
        <br/>
        <p className={styles.footerText}>
          Made with <span role="img" aria-label="love">❤️</span> by Kichu A.K.A Betmen
        </p>
      </footer>
    </main>
  );
}
