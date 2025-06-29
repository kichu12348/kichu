import React from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { FaMoon,FaGamepad } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { IoMusicalNotesSharp } from "react-icons/io5";
import styles from "./start-menu.module.css";

function StartMenu({ onClose, openWindow, goSleep }) {
  const pinnedApps = [
    // { id: "about", icon: AiOutlineUser, name: "About Me" },
    { id: "contact", icon: AiOutlineMail, name: "Contact" },
    { id: "doom", icon: FaGamepad, name: "Doom" },
    { id: "codeEditor", icon: VscVscode, name: "Code" },
    { id: "musicPlayer", icon: IoMusicalNotesSharp, name: "Music Player" },
    
  ];

  const powerOptions = [
    { icon: FaMoon, name: "Sleep" },
    { icon: AiOutlinePoweroff, name: "Shut down" },
  ];

  return (
    <div className={styles.startMenuOverlay} onClick={onClose}>
      <div className={styles.startMenu} onClick={(e) => e.stopPropagation()}>
        <div className={styles.userSection}>
          <div className={styles.userAvatar}>
            <AiOutlineUser className={styles.avatarIcon} />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Kichu</div>
            <div className={styles.userStatus}>A.K.A Betmen</div>
          </div>
        </div>

        <div className={styles.appsSection}>
          <h3 className={styles.sectionTitle}>Pinned</h3>
          <div className={styles.appsGrid}>
            {pinnedApps.map((app) => (
              <div
                key={app.id}
                className={styles.appTile}
                onClick={() => {
                  openWindow(app.id);
                  onClose();
                }}
              >
                <app.icon className={styles.appIcon} />
                <span className={styles.appName}>{app.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottomSection}>
          <button
            className={styles.settingsButton}
            onClick={() => {
              openWindow("settings");
              onClose();
            }}
          >
            <MdSettings className={styles.settingsIcon} />
          </button>

          <div className={styles.powerMenu}>
            {powerOptions.map((option, index) => (
              <button
                key={index}
                className={styles.powerButton}
                onClick={() => {
                  if (option.name === "Sleep") {
                    goSleep.sleep();
                  }
                  else if (option.name === "Shut down") {
                    goSleep.shutDown();
                  }
                  onClose();
                }}
              >
                <option.icon className={styles.powerIcon} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartMenu;
