import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import styles from "./settings-window.module.css";
import Image from "next/image";

function Settings() {
  return (
    <div className={styles.settings}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <AiOutlineSetting className={styles.headerIcon} />
        </div>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Customize your experience</p>
        </div>
      </div>

      <div className={styles.wipContainer}>
        <Image
          src="/images/work-in-progress.png"
          alt="Work in Progress"
          width={150}
          height={150}
        />
      </div>

      <div className={styles.footer}>
        <p className={styles.version}>Version 1.0.0</p>
        <p className={styles.madeWith}>Made with <FaHeart color="red"/> by Kichu A.K.A Batman</p>
      </div>
    </div>
  );
}

export default Settings;
