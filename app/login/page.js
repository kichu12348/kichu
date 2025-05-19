"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createRandomCubes = () => {
    const randomValues = Math.floor(Math.random() * 20 + 5); // Random number between 5 and 25
    const randomColors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A1",
      "#A133FF",
    ];
    const container = document.getElementById("login-conainer");
    const cubes = [];
    for (let i = 0; i < randomValues; i++) {
      const cube = document.createElement("div");
      cube.className = styles.cube;
      const size = Math.random() * 50 + 10; // Random size between 10px and 60px
      cube.style.width = `${size}px`;
      cube.style.backgroundColor =
        randomColors[Math.floor(Math.random() * randomColors.length)];
      cube.style.height = `${size}px`;
      cube.style.top = `${(Math.random() * 100) % 90}%`;
      cube.style.left = `${(Math.random() * 100) % 90}%`;
      //cube.style.transform = `translate(${Math.random() * 100}vw, ${Math.random() * 100}vh)`;
      container.appendChild(cube);
      cubes.push(cube);
    }
    return () => {
      cubes.forEach((cube) => {
        container.removeChild(cube);
      });
    };
  };

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("login-conainer");
      const cubes = container.getElementsByClassName(styles.cube);
      for (let i = 0; i < cubes.length; i++) {
        cubes[i].style.transform = `translate(${Math.random() * 100}vw, ${
          Math.random() * 100
        }vh)`;
      }
    };

    window.addEventListener("resize", handleResize);
    const cleanupCubes = createRandomCubes();
    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupCubes();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Set authentication cookie
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Redirect to admin page on successful login
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
    <div className={styles.container} id="login-conainer">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Admin Login</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Enter password"
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
