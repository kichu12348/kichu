import React from "react";
import { AiOutlineMail, AiOutlineGithub } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { submitContactForm } from "../functions/api";
import styles from "./contact-window.module.css";

function ContactWindow() {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState(""); // "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatusMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    const response = await submitContactForm({ name, email, message });
    if (response.success) {
      setStatusMessage("Message sent successfully!");
      setMessageType("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatusMessage(`Error: ${response.error}`);
      setMessageType("error");
    }
  }



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
              style={{ "--hover-color": "#0077B5" }}
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
              href="https://www.instagram.com/whoiskichu__"
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--hover-color": "#E1306C" }}
            >
              <FiInstagram className={styles.contactIcon} />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Message</h3>
          {statusMessage && (
            <div className={`${styles.statusMessage} ${styles[messageType]}`}>
              {statusMessage}
            </div>
          )}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Name" 
              className={styles.input} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <textarea
                placeholder="Message"
                className={styles.textarea}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
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
