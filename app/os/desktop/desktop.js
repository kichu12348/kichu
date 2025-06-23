import React, { useEffect, useState } from "react";
import DesktopIcon from "../desktop-icon/desktop-icon";
import Taskbar from "../taskbar/taskbar";
import StartMenu from "../start-menu/start-menu";
import WindowWrapper from "../window-wrapper/window-wrapper";
import AboutMeWindow from "../about-me-window/about-me-window";
import ProjectsWindow from "../projects-window/projects-window";
import ContactWindow from "../contact-window/contact-window";
import BrowserWindow from "../browser-window/browser-window";
import Terminal from "../terminal-window/terminal-window";
import ProjectDetailWindow from "../project-detail-viewer/project-detail-window";
import CodeEditor from "../code-window/code-window";
import Settings from "../settings-window/settings-window";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineFileText,
  AiOutlineSetting
} from "react-icons/ai";
import { MdFolderOpen } from "react-icons/md";
import { FaFirefoxBrowser } from "react-icons/fa";
import { IoTerminal } from "react-icons/io5";
import { VscVscode } from "react-icons/vsc";
import styles from "./desktop.module.css";

function Desktop({goSleep}) {
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentWindowZindex, setCurrentWindowZIndex] = useState(10);
  const [windowZIndexes, setWindowZIndexes] = useState({});
  const [projectDetailData, setProjectDetailData] = useState({});
  const [isBackgroundImageLoaded, setIsBackgroundImageLoaded] = useState(false);

  const desktopIcons = [
    {
      id: "about",
      icon: AiOutlineUser,
      label: "About Me",
      component: AboutMeWindow,
    },
    {
      id: "projects",
      icon: MdFolderOpen,
      label: "Projects",
      component: ProjectsWindow,
    },
    {
      id: "contact",
      icon: AiOutlineMail,
      label: "Contact",
      component: ContactWindow,
    },
    {
      id: "browser",
      icon: FaFirefoxBrowser,
      label: "Browser",
      component: BrowserWindow,
    },
    {
      id: "terminal",
      icon: IoTerminal,
      label: "Terminal",
      component: Terminal,
    },
  ];

  const focusWindow = (windowId) => {
    // If window is minimized, restore it
    if (minimizedWindows.includes(windowId)) {
      setMinimizedWindows(minimizedWindows.filter(id => id !== windowId));
    }
    
    const newZIndex = currentWindowZindex + 1;
    setCurrentWindowZIndex(newZIndex);
    setWindowZIndexes((prev) => ({
      ...prev,
      [windowId]: newZIndex,
    }));
  };

  const openWindow = (windowId, data = null) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
      const newZIndex = currentWindowZindex + 1;
      setCurrentWindowZIndex(newZIndex);
      setWindowZIndexes((prev) => ({
        ...prev,
        [windowId]: newZIndex,
      }));

      if (data && windowId.startsWith("project-detail-")) {
        setProjectDetailData((prev) => ({
          ...prev,
          [windowId]: data,
        }));
      }
    } else {
      focusWindow(windowId);
    }
  };

  const minimizeWindow = (windowId) => {
    if (!minimizedWindows.includes(windowId)) {
      setMinimizedWindows([...minimizedWindows, windowId]);
    }
  };

  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter((id) => id !== windowId));
    setMinimizedWindows(minimizedWindows.filter(id => id !== windowId));
    setWindowZIndexes((prev) => {
      const newZIndexes = { ...prev };
      delete newZIndexes[windowId];
      return newZIndexes;
    });

    if (windowId.startsWith("project-detail-")) {
      setProjectDetailData((prev) => {
        const newData = { ...prev };
        delete newData[windowId];
        return newData;
      });
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/backgrounds/city-car.jpg";
    img.onload = () => {
      setIsBackgroundImageLoaded(true);
    };
  }, []);

  return (
    <div className={styles.desktop}>
      {!isBackgroundImageLoaded && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingText}>booting up...</div>
        </div>
      )}
      <div className={styles.desktopIcons}>
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {openWindows.map((windowId) => {
        if (windowId.startsWith("project-detail-")) {
          const projectData = projectDetailData[windowId];
          return (
            <WindowWrapper
              key={windowId}
              title={`${projectData?.title || "Project"} - Details`}
              icon={AiOutlineFileText}
              onClose={() => closeWindow(windowId)}
              onFocus={() => focusWindow(windowId)}
              onMinimize={() => minimizeWindow(windowId)}
              isMinimized={minimizedWindows.includes(windowId)}
              zIndex={windowZIndexes[windowId] || 10}
            >
              <ProjectDetailWindow project={projectData} />
            </WindowWrapper>
          );
        }

        if (windowId === "codeEditor") {
          return (
            <WindowWrapper
              key={windowId}
              title="Code Editor"
              icon={VscVscode}
              onClose={() => closeWindow(windowId)}
              onFocus={() => focusWindow(windowId)}
              onMinimize={() => minimizeWindow(windowId)}
              isMinimized={minimizedWindows.includes(windowId)}
              zIndex={windowZIndexes[windowId] || 10}
            >
              <CodeEditor />
            </WindowWrapper>
          );
        }

        if(windowId === "settings") {
          return (
            <WindowWrapper
              key={windowId}
              title="Settings"
              icon={AiOutlineSetting}
              onClose={() => closeWindow(windowId)}
              onFocus={() => focusWindow(windowId)}
              onMinimize={() => minimizeWindow(windowId)}
              isMinimized={minimizedWindows.includes(windowId)}
              zIndex={windowZIndexes[windowId] || 10}
            >
              <Settings />
            </WindowWrapper>
          );
        }

        const iconData = desktopIcons.find((icon) => icon.id === windowId);
        const WindowComponent = iconData.component;
        return (
          <WindowWrapper
            key={windowId}
            title={iconData.label}
            icon={iconData.icon}
            onClose={() => closeWindow(windowId)}
            onFocus={() => focusWindow(windowId)}
            onMinimize={() => minimizeWindow(windowId)}
            isMinimized={minimizedWindows.includes(windowId)}
            zIndex={windowZIndexes[windowId] || 10}
          >
            <WindowComponent openWindow={openWindow} />
          </WindowWrapper>
        );
      })}

      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          openWindow={openWindow}
          goSleep={goSleep}
        />
      )}

      <Taskbar
        openWindows={openWindows}
        minimizedWindows={minimizedWindows}
        onStartMenuToggle={() => setShowStartMenu(!showStartMenu)}
        focusWindow={focusWindow}
        openWindow={openWindow}
      />
    </div>
  );
}

export default Desktop;
