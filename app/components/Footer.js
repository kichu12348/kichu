import styles from "../page.module.css";
import { useState } from "react";
import BatmanEasterEgg from "./betmen";

export default function Footer() {
  const [showBatman, setShowBatman] = useState(false);
  const [batmanActive, setBatmanActive] = useState(false);

  const handleBatmanClick = () => {
    if (batmanActive) return; 
    setShowBatman(true);
    setBatmanActive(true);
    setTimeout(() => {
      setShowBatman(false);
      setBatmanActive(false);
    }, 3500);
  };

  return (
    <>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Mahadevan Reji. All rights reserved.
        </p>
        <br />
        <p className={styles.footerText} onClick={handleBatmanClick}>
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by Kichu A.K.A{" "}
          <span
            className={
              batmanActive
                ? styles.batmanButtonTextActive
                : styles.batmanButtonText
            }
          >
            Betmen
          </span>
        </p>
      </footer>
      {showBatman && <BatmanEasterEgg />}
    </>
  );
}
