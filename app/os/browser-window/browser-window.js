import React, { useState } from "react";
import styles from "./browser-window.module.css";
import { FaHome } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { IoChevronForward, IoChevronBack, IoSearch } from "react-icons/io5";

function BrowserWindow() {
  const [url, setUrl] = useState("https://www.kichu.space/terminal");
  const [inputUrl, setInputUrl] = useState("https://www.kichu.space/terminal");
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    let formattedUrl = inputUrl;

    // Add protocol if missing
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      // Check if it looks like a search query
      if (!formattedUrl.includes(".") || formattedUrl.includes(" ")) {
        formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(
          formattedUrl
        )}`;
      } else {
        formattedUrl = `https://${formattedUrl}`;
      }
    }

    setUrl(formattedUrl);
    setInputUrl(formattedUrl);
    setIsLoading(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Force iframe reload by changing src
    const iframe = document.getElementById("browser-iframe");
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleHome = () => {
    const homeUrl = "https://www.kichu.space";
    setUrl(homeUrl);
    setInputUrl(homeUrl);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={styles.browserWindow}>
      <div className={styles.browserHeader}>
        <div className={styles.navigationBar}>
          <button
            className={styles.navButton}
            disabled={!canGoBack}
            title="Go back"
          >
            <IoChevronBack />
          </button>
          <button
            className={styles.navButton}
            disabled={!canGoForward}
            title="Go forward"
          >
            <IoChevronForward />
          </button>
          <button
            className={styles.navButton}
            onClick={handleRefresh}
            title="Refresh"
          >
            <TbReload />
          </button>
          <button
            className={styles.navButton}
            onClick={handleHome}
            title="Home"
          >
            <FaHome />
          </button>

          <form className={styles.addressBar} onSubmit={handleUrlSubmit}>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className={styles.addressInput}
              placeholder="Search or enter address"
            />
            <button type="submit" className={styles.goButton}>
              <IoSearch />
            </button>
          </form>
        </div>
      </div>

      <div className={styles.browserContent}>
        {isLoading && (
          <div className={styles.loadingBar}>
            <div className={styles.loadingProgress}></div>
          </div>
        )}
        <iframe
          id="browser-iframe"
          src={url}
          className={styles.browserFrame}
          onLoad={handleIframeLoad}
          title="Browser Content"
          sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation"
        />
      </div>
    </div>
  );
}

export default BrowserWindow;

