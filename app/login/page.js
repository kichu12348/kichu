"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const particlesContainerRef = useRef(null);
  
  useEffect(() => {
    const createParticles = () => {
      const container = particlesContainerRef.current;
      if (!container) return () => {};
      
      const particleCount = 40; // Reduced slightly for darker theme
      const particles = [];
      
      // Clear any existing particles
      container.innerHTML = '';
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = styles.particle;
        
        // Random properties
        const size = Math.random() * 6 + 1; // Smaller particles
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 10; // Longer duration for slower movement
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
        particles.push(particle);
      }
      
      return () => {
        particles.forEach(p => {
          if (p.parentNode === container) {
            container.removeChild(p);
          }
        });
      };
    };
    
    const cleanupParticles = createParticles();
    
    const handleResize = () => {
      cleanupParticles();
      createParticles();
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupParticles();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.particlesContainer} ref={particlesContainerRef}></div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Admin Login</h1>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder=" "
                required
              />
              <label htmlFor="password" className={styles.floatingLabel}>
                Password
              </label>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button 
            type="submit" 
            className={styles.button} 
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loadingSpinner}></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
