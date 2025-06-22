import React from "react";
import { VscMenu } from "react-icons/vsc";
import {
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineWifi,
} from "react-icons/ai";
import { BsBatteryFull } from "react-icons/bs";
import styles from "./taskbar.module.css";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineFileText,
} from "react-icons/ai";
import { MdFolderOpen } from "react-icons/md";
import { FaFirefoxBrowser } from "react-icons/fa";
import { IoTerminal } from "react-icons/io5";
import { VscVscode } from "react-icons/vsc";

const IconsMap = {
  about: AiOutlineUser,
  projects: MdFolderOpen,
  contact: AiOutlineMail,
  browser: FaFirefoxBrowser,
  projectDetail: AiOutlineFileText,
  terminal: IoTerminal,
  codeEditor: VscVscode,
};

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};

function Taskbar({ openWindows, onStartMenuToggle, focusWindow }) {
  const handleFocus = (windowId) => focusWindow(windowId);
  const [currentTime, setCurrentTime] = React.useState(getCurrentTime());
  const [currentDate, setCurrentDate] = React.useState(getCurrentDate());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setCurrentDate(getCurrentDate());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.taskbar}>
      <div className={styles.leftSection}>
        <button className={styles.startButton} onClick={onStartMenuToggle}>
          <VscMenu className={styles.startIcon} />
        </button>

        <button className={styles.searchButton}>
          <AiOutlineSearch className={styles.searchIcon} />
        </button>

        <div className={styles.openApps}>
          {openWindows.map((windowId) => (
            <div
              key={windowId}
              className={styles.appIcon}
              onClick={() => handleFocus(windowId)}
            >
              {windowId.startsWith("project-detail-")
                ? React.createElement(IconsMap.projectDetail, {
                    className: styles.appIconImage,
                  })
                : React.createElement(IconsMap[windowId], {
                    className: styles.appIconImage,
                  })}
              <div className={styles.appIndicator}></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.systemIcons}>
          <AiOutlineWifi className={styles.systemIcon} />
          <BsBatteryFull className={styles.systemIcon} />
          <AiOutlineSetting className={styles.systemIcon} />
        </div>

        <div className={styles.clock}>
          <div className={styles.time}>{currentTime}</div>
          <div className={styles.date}>{currentDate}</div>
        </div>
      </div>
    </div>
  );
}

export default Taskbar;
