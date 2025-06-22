import React from "react";
import { AiOutlineMail, AiOutlineGithub } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import styles from "./contact-window.module.css";

function ContactWindow() {
  return (
    <div className={styles.contact}>
      <div className={styles.header}>
        <h2 className={styles.title}>Let&apos;s Connect</h2>
        <p className={styles.subtitle}>
          Always open to interesting conversations and opportunities
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact</h3>
          <div className={styles.contactLinks}>
            <a
              href="mailto:rmahadevan574@gmail.com"
              className={styles.contactLink}
            >
              <AiOutlineMail className={styles.contactIcon} />
              <span>rmahadevan574@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/MahadevanReji"
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className={styles.contactIcon} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/kichu12348"
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineGithub className={styles.contactIcon} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/noiceetea"
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram className={styles.contactIcon} />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Message</h3>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Name" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <textarea
                placeholder="Message"
                className={styles.textarea}
                rows={4}
              />
            </div>
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactWindow;
