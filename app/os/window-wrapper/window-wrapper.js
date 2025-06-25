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
  onMinimize,
  zIndex,
  isMinimized,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
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

  const handleResizeMouseDown = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };
      setPosition(newPosition);
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      let newSize = { ...size };

      if (resizeDirection.includes("right")) {
        newSize.width = Math.max(300, resizeStart.width + deltaX);
      }
      if (resizeDirection.includes("left")) {
        newSize.width = Math.max(300, resizeStart.width - deltaX);
      }
      if (resizeDirection.includes("bottom")) {
        newSize.height = Math.max(200, resizeStart.height + deltaY);
      }
      if (resizeDirection.includes("top")) {
        newSize.height = Math.max(200, resizeStart.height - deltaY);
      }

      setSize(newSize);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
  };

  const handleMinimize = () => {
    onMinimize?.();
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, size]);

  return (
    <div
      ref={windowRef}
      className={`${styles.windowWrapper} ${
        isMinimized ? styles.minimized : ""
      }`}
      onClick={handleWindowClick}
      style={{
        transform: `translateX(calc(-50% + ${position.x}px)) translateY(${position.y}px)`,
        zIndex: zIndex,
        width: size.width,
        height: size.height,
        display: isMinimized ? "none" : "block",
      }}
    >
      <div className={styles.windowHeader} onMouseDown={handleMouseDown}>
        <div className={styles.titleSection}>
          <Icon className={styles.titleIcon} />
          <span className={styles.title}>
            {title && title.length > 18
              ? title.slice(0, 18).trim() + "..."
              : title || "Untitled"}
          </span>
        </div>
        <div className={styles.controls}>
          <button
            className={`${styles.controlButton} ${styles.minimize}`}
            onClick={handleMinimize}
          >
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

      {/* Resize handles */}
      <div className={styles.resizeHandles}>
        <div
          className={`${styles.resizeHandle} ${styles.resizeTop}`}
          onMouseDown={(e) => handleResizeMouseDown(e, "top")}
        />
        {/* <div 
          className={`${styles.resizeHandle} ${styles.resizeRight}`}
          onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
        /> */}
        <div
          className={`${styles.resizeHandle} ${styles.resizeBottom}`}
          onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
        />
        <div
          className={`${styles.resizeHandle} ${styles.resizeLeft}`}
          onMouseDown={(e) => handleResizeMouseDown(e, "left")}
        />
        <div
          className={`${styles.resizeHandle} ${styles.resizeTopLeft}`}
          onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
        />
        <div
          className={`${styles.resizeHandle} ${styles.resizeTopRight}`}
          onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
        />
        <div
          className={`${styles.resizeHandle} ${styles.resizeBottomLeft}`}
          onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
        />
        <div
          className={`${styles.resizeHandle} ${styles.resizeBottomRight}`}
          onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
        />
      </div>
    </div>
  );
}

export default WindowWrapper;
