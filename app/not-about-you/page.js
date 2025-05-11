"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./not-about-you.module.css";
import confetti from "canvas-confetti";
import {
  FaHeart,
  FaCheck,
  FaStar,
  FaDownload,
  FaCrown,
  FaMagic,
  FaGift,
} from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import html2canvas from "html2canvas";
import "./colors.css";

const initialCompliments = [
  "Your smile could literally power a small city. No joke, scientists are looking into it.",
  "When you laugh, the whole world stops and stares for a while.",
  "You have this incredible way of making people feel special without even trying.",
  "You're the human equivalent of finding an extra fry at the bottom of the bag.",
  "If you were a scented candle, you'd be 'Everyone's Favorite Person.'",
  "The world is genuinely better because you exist in it.",
  "Your energy is so contagious that even introverts want to be around you.",
  "You're like sunshine on a cloudy day – brightening everything around you.",
  "Honestly, are you magic? Because you just made my entire day.",
  "If kindness were a superpower, you'd already have your own Marvel movie.",
  "You're the kind of person playlists are written about.",
  "Pretty sure your hugs could solve global problems.",
  "You somehow make ordinary moments feel like movie scenes.",
  "If charm had a face, it’d probably look a lot like yours.",
  "You're basically the main character in everyone’s favorite rom-com.",
  "Being around you feels like waking up to your favorite song and perfect weather.",
  "You're not just cute — you're *rewatch-my-favorite-scene-twice* kind of cute.",
];

const stampIcons = [
  { icon: <FaStar />, text: "Certified Adorable" },
  { icon: <FaCheck />, text: "100% True" },
  { icon: <FaCrown />, text: "Royal Decree" },
  { icon: <FaMagic />, text: "Magical Truth" },
];

const debouncded = (func, delay) => {
  let timeoutId;
  return (...args)=>{
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  }
}

export default function NotAboutYou() {
  // State management
  const [name, setName] = useState("");
  const [currentSection, setCurrentSection] = useState("landing");
  const [revealStep, setRevealStep] = useState(0);
  const [compliments, setCompliments] = useState([]);
  const [availableCompliments, setAvailableCompliments] = useState([
    ...initialCompliments,
  ]);
  const [showProceedToCompliments, setShowProceedToCompliments] =
    useState(false);
  const [showCuteAlert, setShowCuteAlert] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [randomCompliment, setRandomCompliment] = useState("");
  const hasGivenAllCompliments = useRef(false);
  const receiptRef = useRef(null);

  useEffect(() => {
    if (currentSection === "landing") {
      setTimeout(() => {
        setEnvelopeOpen(true);
      }, 800);
    }
  }, [currentSection]);

  useEffect(() => {
    const head = document.head;
    head
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#FF8AAE");
    const title = head.querySelectorAll("title");
    title.forEach(async (t) => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      t.innerHTML = "Not About You";
    });
    const fav = head.querySelectorAll("link[rel=icon]");
    fav.forEach((l) => {
      l.setAttribute("href", "/images/star.svg");
      l.setAttribute("type", "image/svg+xml");
      l.setAttribute("sizes", "any");
    });
  }, []);

  useEffect(() => {
    if (currentSection === "reveal" && revealStep === 0) {
      setTimeout(() => setRevealStep(1), 800);
      setTimeout(() => {
        setRevealStep(2);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FF8AAE", "#FFDD95", "#B5DEFF", "#CF9FFF"],
        });

        // Show the next button after final reveal
        setTimeout(() => setShowProceedToCompliments(true), 1500);
      }, 3500);
    }
  }, [currentSection, revealStep]);

  // Handle name submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Special case for certain names
      if (name.toLowerCase() === "alex") {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });

        // Slight delay before transition
        setTimeout(() => {
          setCurrentSection("denial");
        }, 300);
      } else {
        // Regular transition
        setCurrentSection("denial");
      }
    }
  };

  // Navigate to reveal section
  const handleContinueToReveal = () => {
    setCurrentSection("reveal");
  };

  // Navigate to compliments section
  const handleProceedToCompliments = () => {
    setCurrentSection("compliments");

    // Small confetti pop for transition
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 300);
  };

  const randomizeCompliments = (name) => {
    const comps = [
      `${name}, your presence is like a warm hug.`,
      `${name}, you'd be the richest in kindness.`,
      `${name}, your smile outshines the sun.`,
      `${name}, you're a ray of sunshine.`,
      `${name}, your laugh makes hearts dance.`,
      `${name}, you make everyone feel special.`,
      `${name}, you're proof good vibes spread.`,
      `${name}, you turn moments extraordinary.`,
      `${name}, you're a reminder of goodness.`,
    ];
    const randomIndex = Math.floor(Math.random() * comps.length);
    return comps[randomIndex];
  }


  const handleRandomCompliment = (name) => {
    if (!name||name.trim() === ""){
      setRandomCompliment("");
      return;
    }
    const randomCompliment = randomizeCompliments(name);
    setRandomCompliment(randomCompliment);
  }

  const handleRandomComplimentDebounced = useMemo(()=>debouncded(handleRandomCompliment, 300),[]);

  // Add a new compliment
  const handleAddCompliment = () => {
    if (availableCompliments.length === 0) {
      if (hasGivenAllCompliments.current) return;
      hasGivenAllCompliments.current = true;
      setCompliments((prev) => [
        ...prev,
        {
          text: "I'm running out of nice things to say... just kidding! You're simply THAT amazing that I can't keep up lol!",
          stamp: stampIcons[Math.floor(Math.random() * stampIcons.length)],
          id: Date.now(),
        },
      ]);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableCompliments.length);
    const newComplimentText = availableCompliments[randomIndex];
    const randomStamp =
      stampIcons[Math.floor(Math.random() * stampIcons.length)];

    // Add compliment and remove from available pool
    setCompliments((prev) => [
      ...prev,
      {
        text: newComplimentText,
        stamp: randomStamp,
        id: Date.now(),
        rotation: Math.floor(Math.random() * 6) - 3,
      },
    ]);
    setAvailableCompliments((prev) =>
      prev.filter((_, index) => index !== randomIndex)
    );

    // Tiny confetti pop for each compliment
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.75 },
      colors: ["#FF8AAE", "#FFDD95"],
    });

    // Show alert after 3 compliments
    if (compliments.length + 1 === 3 && !showCuteAlert) {
      setTimeout(() => {
        setShowCuteAlert(true);
      }, 800);
    }

    // Show final button after 5 compliments
    if (compliments.length + 1 >= 5 && !showFinalButton) {
      setShowFinalButton(true);
    }
  };

  // Handle the "Acknowledge My Power" button
  const handleAcknowledgePower = () => {
    // Massive confetti celebration
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#FF8AAE", "#FFDD95", "#B5DEFF", "#CF9FFF"],
    });

    // Hide the modal
    setShowCuteAlert(false);
  };

  // Add keyboard listener for compliment generation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        currentSection === "compliments" &&
        (event.key === "Enter" || event.key === " ")
      ) {
        handleAddCompliment();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    currentSection,
    availableCompliments,
    compliments.length,
    showCuteAlert,
    showFinalButton,
  ]);

  // Navigate to final receipt section
  const handleProceedToFinal = () => {
    setCurrentSection("final");
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#FF8AAE", "#FFDD95", "#B5DEFF", "#CF9FFF"],
      });
    }, 500);
  };

  // Handle receipt download
  const handleDownloadReceipt = async () => {
    if (receiptRef.current) {
      try {
        const downloadButton = document.querySelector(
          `.${styles.downloadButton}`
        );
        if (downloadButton) {
          downloadButton.textContent = "Generating...";
          downloadButton.disabled = true;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(receiptRef.current, {
          backgroundColor: null,
          scale: 3,
          useCORS: true,
          logging: false,
          letterRendering: true,
        });

        const image = canvas.toDataURL("image/png", 1.0);

        const link = document.createElement("a");
        link.href = image;
        link.download = `Special_Note_For_${name.replace(/\s+/g, "_")}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (downloadButton) {
          downloadButton.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg> Download Love Letter`;
          downloadButton.disabled = false;
        }

        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#FF8AAE", "#FFDD95"],
        });
      } catch (error) {
        console.error("Error generating image:", error);
        alert(
          "Sorry! There was an error creating your letter. Please try again."
        );

        const downloadButton = document.querySelector(
          `.${styles.downloadButton}`
        );
        if (downloadButton) {
          downloadButton.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg> Try Again`;
          downloadButton.disabled = false;
        }
      }
    }
  };

  const getPersonalizedGreeting = () => {
    const greetings = [
      `Dear wonderful ${name},`,
      `To the amazing ${name},`,
      `${name}, this is for you,`,
      `For the incredible ${name},`,
      `Hey ${name}, you're awesome,`,
      `Sweet ${name}, brace yourself for a little joy,`,
      `Hi ${name}, just a little reminder of how lovable you are,`,
      `Gorgeous ${name}, this one's all yours,`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const getPersonalizedClosing = () => {
    const closings = [
      `${name}, never forget how special you are.`,
      `The world is brighter with you in it, ${name}.`,
      `Keep being your amazing self, ${name}.`,
      `${name}, you're more incredible than you know.`,
      `Remember, ${name}, you matter. A lot.`,
      `Don’t you dare forget how lovable you are, ${name}.`,
      `Just being you is more than enough, ${name}.`,
      `Sending a little love your way, ${name}, just because you’re you.`,
    ];
    return closings[Math.floor(Math.random() * closings.length)];
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {/* Landing Section - Envelope */}
        {currentSection === "landing" && (
          <div className={styles.section}>
            <div
              className={`${styles.envelope} ${
                envelopeOpen ? styles.open : ""
              }`}
            >
              <div className={styles.envelopeFold}>
                <div className={styles.envelopeTop}></div>
              </div>
              <div className={styles.envelopeLetter}>
                <span>
                  <span className={styles.heart}>
                    <IoHeart />
                  </span>
                </span>
                <div className={styles.lines}>
                  <div className={styles.line}>
                    {randomCompliment}
                  </div>
                </div>
              </div>
              <div className={styles.envelopeBottom}></div>
            </div>

            <div className={styles.welcomeInput}>
              <p className={styles.handwrittenText}>
                Before we start: what&apos;s your name?
                <br />
                <span
                  style={{
                    fontSize: "0.9rem",
                    opacity: 0.7,
                    paddingBottom: "10px",
                  }}
                >
                  (Don&apos;t worry, this isn&apos;t about you.)
                </span>
              </p>

              <form
                onSubmit={handleSubmit}
                style={{ width: "100%", marginTop: "20px" }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    handleRandomComplimentDebounced(e.target.value);
                  }}
                  placeholder="Type your name here..."
                  className={styles.nameInput}
                  aria-label="Your name"
                  autoComplete="off"
                  autoFocus
                  required
                  spellCheck="false"
                />
                <button type="submit" className={styles.cuteButton}>
                  Continue (again, definitely not about you)
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Denial Section - Sticky Note */}
        {currentSection === "denial" && (
          <div className={styles.section}>
            <div className={styles.stickyNote}>
              <h1 className={styles.denialHeader}>
                This page is absolutely NOT about {name}.
              </h1>
              <p className={styles.denialSubtext}>
                I barely know ya. Nothing personal. Probably lovely though.
              </p>
              <p className={styles.denialWarning}>
                Move along. Nothing to see here.
              </p>
            </div>

            <div
              className={styles.scrollIndicator}
              onClick={handleContinueToReveal}
              title="Click to continue"
            >
              <IoHeart />
            </div>
          </div>
        )}
        {currentSection === "reveal" && (
          <div className={styles.section}>
            <div className={styles.revealContainer}>
              <div className={styles.sparkle}></div>
              <div className={styles.sparkle}></div>
              <div className={styles.sparkle}></div>
              <div className={styles.sparkle}></div>
              <div className={styles.sparkle}></div>

              {revealStep === 0 && (
                <div className={styles.revealText}>&nbsp;</div>
              )}

              {revealStep === 1 && (
                <p className={styles.revealText}>
                  Okie... maybe it's a&nbsp;
                  <em className={styles.inlineEm}>tiny bit</em>&nbsp;about you.
                </p>
              )}

              {revealStep === 2 && (
                <span className={styles.revealText}>
                  Actually, yeah. This whole thing is for you,&nbsp;
                  <span>{name}</span>.
                  <p className={styles.heart}>
                    <IoHeart />
                  </p>
                </span>
              )}

              {showProceedToCompliments && revealStep === 2 && (
                <button
                  onClick={handleProceedToCompliments}
                  className={styles.cuteButton}
                  style={{ marginTop: "30px" }}
                >
                  Ready for some good vibes?
                </button>
              )}
            </div>
          </div>
        )}

        {currentSection === "compliments" && (
          <div className={styles.section}>
            <div className={styles.polaroidWall}>
              <div className={styles.polaroidGrid}>
                {compliments.length === 0 && (
                  <p className={styles.emptyWallText}>
                    Click the button below to receive some well-deserved
                    compliments!
                  </p>
                )}

                {compliments.map((comp) => (
                  <div
                    key={comp.id}
                    className={styles.polaroid}
                    style={{ "--rotation": `${comp.rotation || 0}deg` }}
                  >
                    <div className={styles.polaroidContent}>
                      {comp.text}
                      <div className={styles.polaroidStamp}>
                        {comp.stamp.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddCompliment}
              className={styles.getComplimentButton}
              disabled={
                availableCompliments.length === 0 &&
                compliments.length >= initialCompliments.length
              }
            >
              {availableCompliments.length === 0 &&
              compliments.length >= initialCompliments.length
                ? "That's All I have! (´。＿。｀)"
                : "Get a Compliment"}
            </button>

            <p className={styles.complimentInstruction}>
              (Or press Enter / Space)
            </p>

            {showFinalButton && (
              <button
                onClick={handleProceedToFinal}
                className={styles.cuteButton}
                style={{ marginTop: "20px" }}
              >
                Create Letter Summary <FaGift style={{ marginLeft: "5px" }} />
              </button>
            )}
          </div>
        )}

        {showCuteAlert && (
          <div className={styles.modalOverlay}>
            <div className={styles.cuteAlert}>
              <h2 className={styles.alertHeader}>
                <FaHeart className={styles.alertIcon} />
                Cuteness Detected!
                <FaHeart className={styles.alertIcon} />
              </h2>

              <div className={styles.alertBody}>
                <p>System has detected dangerously high levels of charm.</p>
                <p>
                  Please calm down or send selfie(heh..) for further
                  verification.
                </p>
              </div>

              <button
                onClick={handleAcknowledgePower}
                className={styles.powerButton}
              >
                Acknowledge My Power
              </button>
            </div>
          </div>
        )}

        {currentSection === "final" && (
          <div className={styles.loveLetterContainer}>
            <h2 className={styles.loveLetterHeader}>
              <FaHeart className={styles.heartIcon} />A Special Note For {name}
              <FaHeart className={styles.heartIcon} />
            </h2>

            <div className={styles.loveLetter} ref={receiptRef}>
              <div className={styles.letterHeader}>
                <h3>{getPersonalizedGreeting()}</h3>
                <p className={styles.letterDate}>
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className={styles.letterContent}>
                <p className={styles.letterIntro}>
                  You know, {name}, this page really wasn&apos;t supposed to be
                  about you. But sometimes the universe has other plans,
                  especially when it meets someone as remarkable as you.
                </p>

                <p className={styles.letterSubheader}>
                  What Makes {name} Special:
                </p>
                <ul className={styles.complimentList}>
                  {compliments.map((comp, index) => (
                    <li key={index}>{comp.text}</li>
                  ))}
                </ul>

                <p className={styles.letterOutro}>
                  If you&apos;re ever having a tough day, {name}, please come
                  back and read this again. Remember these words aren&apos;t
                  just empty compliments – they&apos;re truths about who you
                  are.
                </p>
              </div>

              <div className={styles.letterFooter}>
                <p>{getPersonalizedClosing()}</p>
                <div className={styles.letterStamp}>
                  Made with <IoHeart color="#FF8AAE" /> for {name}
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadReceipt}
              className={styles.downloadButton}
            >
              <FaDownload /> Download Letter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
