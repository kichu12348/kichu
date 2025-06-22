import React, { useState, useRef } from "react";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeClose,
} from "react-icons/vsc";
import styles from "./window-wrapper.module.css";

function WindowWrapper({
  title,
  icon: Icon,
  children,
  onClose,
  onFocus,
  zIndex,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    onFocus?.();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleWindowClick = () => {
    onFocus?.();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newPosition = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    };
    setPosition(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      ref={windowRef}
      className={styles.windowWrapper}
      onClick={handleWindowClick}
      style={{
        transform: `translateX(calc(-50% + ${position.x}px)) translateY(${position.y}px)`,
        zIndex: zIndex,
      }}
    >
      <div className={styles.windowHeader} onMouseDown={handleMouseDown}>
        <div className={styles.titleSection}>
          <Icon className={styles.titleIcon} />
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.controls}>
          <button className={`${styles.controlButton} ${styles.minimize}`}>
            <VscChromeMinimize />
          </button>
          <button className={`${styles.controlButton} ${styles.maximize}`}>
            <VscChromeMaximize />
          </button>
          <button
            className={`${styles.controlButton} ${styles.close}`}
            onClick={onClose}
          >
            <VscChromeClose />
          </button>
        </div>
      </div>
      <div className={styles.windowBody}>{children}</div>
    </div>
  );
}

export default WindowWrapper;
