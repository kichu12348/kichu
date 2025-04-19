import styles from "../page.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} Mahadevan Reji. All rights reserved.
      </p>
      <br/>
      <p className={styles.footerText}>
        Made with <span role="img" aria-label="love">❤️</span> by Kichu A.K.A Betmen
      </p>
    </footer>
  );
}
