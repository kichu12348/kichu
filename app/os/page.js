"use client";
import React from "react";
import Desktop from "./desktop/desktop";
import styles from "./page.module.css";
import { WindowProvider } from "./context/windowContext";
import projectStore from "./states/project";

function OS() {
  const initProjects = projectStore((state) => state.init);

  React.useEffect(() => {
    initProjects();
  }, []);

  React.useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <WindowProvider>
      <div className={styles.osContainer}>
        <Desktop />
      </div>
    </WindowProvider>
  );
}

export default OS;
