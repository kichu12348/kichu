import React from "react";
import { VscMenu } from "react-icons/vsc";
import {
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineWifi,
} from "react-icons/ai";
import {
  BsBatteryFull,
  BsBatteryHalf,
  BsBattery,
  BsBatteryCharging,
} from "react-icons/bs";
import { MdSignalWifiOff, MdSignalCellularAlt } from "react-icons/md";
import styles from "./taskbar.module.css";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineFileText,
} from "react-icons/ai";
import { MdFolderOpen } from "react-icons/md";
import { FaFirefoxBrowser, FaGamepad } from "react-icons/fa";
import { IoTerminal } from "react-icons/io5";
import { VscVscode } from "react-icons/vsc";
import { IoMusicalNotesSharp } from "react-icons/io5";

const IconsMap = {
  about: AiOutlineUser,
  projects: MdFolderOpen,
  contact: AiOutlineMail,
  browser: FaFirefoxBrowser,
  projectDetail: AiOutlineFileText,
  terminal: IoTerminal,
  codeEditor: VscVscode,
  settings: AiOutlineSetting,
  musicPlayer: IoMusicalNotesSharp,
  doom: FaGamepad,
};

const getIconComponent = (iconName) => {
  const IconComponent = IconsMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in IconsMap.`);
    return AiOutlineFileText; // Fallback icon
  }
  return IconComponent;
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

const getBatteryIcon = (percentage, isCharging) => {
  if (isCharging) return BsBatteryCharging;
  if (percentage > 75) return BsBatteryFull;
  if (percentage > 25) return BsBatteryHalf;
  return BsBattery;
};

const getNetworkIcon = (isOnline, connectionType) => {
  if (!isOnline) return MdSignalWifiOff;
  if (connectionType === "cellular") return MdSignalCellularAlt;
  return AiOutlineWifi;
};

function Taskbar({ openWindows, onStartMenuToggle, focusWindow, openWindow }) {
  const handleFocus = (windowId) => focusWindow(windowId);
  const [currentTime, setCurrentTime] = React.useState(getCurrentTime());
  const [currentDate, setCurrentDate] = React.useState(getCurrentDate());
  const [batteryPercentage, setBatteryPercentage] = React.useState(null);
  const [isCharging, setIsCharging] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(null);
  const [connectionType, setConnectionType] = React.useState("wifi");
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Initialize client-side values
    setIsOnline(navigator.onLine);

    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setCurrentDate(getCurrentDate());
    }, 1000);

    // Battery API
    if (navigator.getBattery) {
      navigator
        .getBattery()
        .then(function (battery) {
          const level = battery.level * 100;
          setBatteryPercentage(Math.round(level));
          setIsCharging(battery.charging);

          const updateBatteryLevel = () =>
            setBatteryPercentage(Math.round(battery.level * 100));
          const updateChargingStatus = () => setIsCharging(battery.charging);

          battery.addEventListener("levelchange", updateBatteryLevel);
          battery.addEventListener("chargingchange", updateChargingStatus);
        })
        .catch(() => {
          console.warn("Battery API not supported");
          setBatteryPercentage(100); // Fallback value
        });
    } else {
      setBatteryPercentage(100); // Fallback value
    }

    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    const updateConnectionType = () => {
      if (navigator.connection) {
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;
        if (connection.type === "cellular") {
          setConnectionType("cellular");
        } else {
          setConnectionType("wifi");
        }
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    if (navigator.connection) {
      navigator.connection.addEventListener("change", updateConnectionType);
      updateConnectionType();
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);

      if (navigator.connection) {
        navigator.connection.removeEventListener(
          "change",
          updateConnectionType
        );
      }
    };
  }, []);

  // Use fallback values during SSR and initial client render
  const displayBatteryPercentage = batteryPercentage ?? 100;
  const displayIsOnline = isOnline ?? true;

  const BatteryIcon = getBatteryIcon(displayBatteryPercentage, isCharging);
  const NetworkIcon = getNetworkIcon(displayIsOnline, connectionType);

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
                : React.createElement(getIconComponent(windowId), {
                    className: styles.appIconImage,
                  })}
              <div className={styles.appIndicator}></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.systemIcons}>
          <NetworkIcon
            className={`${styles.systemIcon} ${
              !displayIsOnline ? styles.offline : ""
            }`}
            title={
              isClient
                ? displayIsOnline
                  ? `Connected via ${connectionType}`
                  : "No connection"
                : "Network status"
            }
          />
          <BatteryIcon
            className={`${styles.systemIcon} ${
              isCharging ? styles.charging : ""
            }`}
            title={
              isClient
                ? `Battery: ${displayBatteryPercentage}% ${
                    isCharging ? "(Charging)" : ""
                  }`
                : "Battery status"
            }
          />
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
