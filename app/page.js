"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "./page.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import NeuralNetwork from "./components/NeuralNetwork";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import SocialLinks from "./components/SocialLinks";
import Footer from "./components/Footer";
import QuantumCursor from "./quantum-cursor";

gsap.registerPlugin(ScrollTrigger);

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
      const body = document.body;
      if (scrollPercentage < 0.2) {
        setQuantumState(0);
      } else if (scrollPercentage < 0.5) {
        setQuantumState(1);
      } else if (scrollPercentage < 0.8) {
        setQuantumState(2);
        setCyberpunkMode(false);
        document.head.querySelector('meta[name="theme-color"]')?.setAttribute('content', 'rgb(248, 250, 252)');
        body.style.setProperty('--scrollbar-track-color', 'rgba(240, 242, 245, 0.8)');
      } else {
        document.head.querySelector('meta[name="theme-color"]')?.setAttribute('content', 'rgb(18, 24, 38)');
        body.style.setProperty('--scrollbar-track-color', 'rgba(12, 15, 26, 0.8)');
        setQuantumState(3);
        setCyberpunkMode(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(()=>{
    document.head.querySelector('meta[name="theme-color"]')?.setAttribute('content', 'rgb(248, 250, 252)');
  },[])

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

      <HeroSection />
      <AboutSection ref={aboutSectionRef} />
      <SkillsSection ref={skillsSectionRef} />
      <ProjectsSection ref={projectsSectionRef} />
      <EducationSection ref={educationSectionRef} />
      <ContactSection ref={contactSectionRef} />

      <SocialLinks 
        hidden={activeSection === "contact" || activeSection === "projects" ||activeSection==="education"} 
        cyberpunkMode={cyberpunkMode} 
      />

      <Footer />
    </main>
  );
}
