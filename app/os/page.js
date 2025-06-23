"use client";
import React from "react";
import Desktop from "./desktop/desktop";
import styles from "./page.module.css";
import { WindowProvider } from "./context/windowContext";
import { IoLockClosed } from "react-icons/io5";
import projectStore from "./states/project";
import { useRouter } from "next/navigation";

function OS() {
  const initProjects = projectStore((state) => state.init);

  const router = useRouter();

  const [isSleeping, setIsSleeping] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    initProjects();
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
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

  const handleWakeUp = () => {
    setIsSleeping(false);
  };

  const handleSleep = () => {
    setIsSleeping(true);
  };

  const goSleep={
    sleep: handleSleep,
    shutDown:()=>{
      router.push("/");
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <WindowProvider>
      <div className={styles.osContainer}>
        {isSleeping && (
          <div className={styles.sleepOverlay} onClick={handleWakeUp}>
            <div className={styles.sleepMessage}>
              <IoLockClosed className={styles.lockIcon} />
              <div className={styles.timeDisplay}>
                <h1 className={styles.time}>{formatTime(currentTime)}</h1>
                <p className={styles.date}>{formatDate(currentTime)}</p>
              </div>
              <p className={styles.wakeUpText}>Click anywhere to wake up</p>
            </div>
          </div>
        )}
        <Desktop goSleep={goSleep} />
      </div>
    </WindowProvider>
  );
}

export default OS;
