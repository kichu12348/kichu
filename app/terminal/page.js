"use client";
import styles from "./terminal.module.css";
import { useEffect, useState, useRef } from "react";
import { rollsArr } from "./rolls";

const aboutMeText = [
  "I'm a full-stack developer currently pursuing Computer",
  "Science Engineering at College of Engineering Chengannur. With",
  "expertise in modern web technologies and a strong foundation in",
  "systems programming, I build scalable, efficient solutions that",
  "solve real-world problems.",
  "",
  "My journey in software development began with a curiosity for how",
  "things work under the hood, leading me to explore everything from",
  "high-level web frameworks to low-level systems programming. This",
  "diverse background allows me to approach problems from multiple",
  "perspectives and choose the right tool for each job.",
  "",
];

const initialMessage = [
  "[Version 24.02.05]",
  "(c) Kichu Not Evil Corp. All rights reserved.",
  `Type "help" for a list of commands.`,
  "",
];

const randomQuotes = [
  "If life gives you lemons, trade them for ice cream. After all, life's too short for sour moments.",
  "When reality calls, sometimes it's okay to hang up. You don’t need to answer every time.",
  "Follow your heart... but also check the fridge. You never know when you'll find your true calling.",
  "If at first, you don’t succeed, remember: skydiving is definitely not a ‘try and try again’ situation.",
  "I'm not lazy, I’m just conserving my energy for something important... like napping.",
  "The world is a simulation, and my code just threw an exception. Sometimes, it's okay to glitch.",
  "If life gives you lemons, check if the world’s running a citrus monopoly. It’s probably a plot.",
  "Coffee first. Schemes later. You can't conquer the world without your morning brew.",
  "I’m on a seafood diet—I see food, and I eat it. That’s my diet advice: stay hungry for both food and life.",
  "404: Motivation not found. Sometimes, it’s okay to just not feel it. Maybe try again tomorrow.",
  "I learned to code for her. Now I debug alone... but hey, at least I learned a lot about patience.",
  "I’m on a rollercoaster of caffeine and bad decisions. But hey, at least it's never boring!",
  "Don’t worry, I’m not procrastinating—I’m just an enthusiast of waiting for the perfect moment to start.",
  "I put my heart into coding, but the compiler threw it away. Sometimes, life just doesn't compile the way you want.",
  "I can’t adult today, but I can definitely debug. Priorities, right?",
  "They told me to follow my dreams, so I wrote a script to do it for me. Efficiency, people.",
  "I’m not arguing, I’m just explaining why I’m right... in code. It’s a developer thing.",
  "I told my computer I needed space. It froze. Sometimes, we all need a little space to reboot.",
  "It’s not procrastinating; it’s just prioritizing your nap time. Rest is part of the process.",
];

export default function Terminal() {
  const [outputLines, setOutputLines] = useState([...initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const expressionIndex = useRef(-1);
  const allExpressions = useRef([]);
  const loc = useRef(null);
  const audioRef = useRef(null);

  function asciiVideo(audio, outputFn) {
    let isRendering = true;
    let frameIndex = 0;
    const frameDelay = 1000 / 30;
    audio.currentTime = 0;
    audio.play();

    const cleanup = () => {
      isRendering = false;
      outputFn("");
      audio.pause();
      audio.currentTime = 0;
    };

    function renderNextFrame() {
      if (!isRendering || frameIndex >= rollsArr.length) {
        cleanup();
        return;
      }

      outputFn(rollsArr[frameIndex]);
      frameIndex++;

      if (isRendering) {
        setTimeout(renderNextFrame, frameDelay);
      }
    }

    renderNextFrame();

    return cleanup;
  }

  useEffect(() => {
    const audio = new Audio("/audio/rolls.mp3");
    audio.preload = "auto";
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json");
        if (!response.ok) throw new Error("Network response was not ok😞");
        const data = await response.json();
        loc.current = data;
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    fetchLocation();
  }, []);

  const setAllExpressions = (newValue) => {
    if (typeof newValue === "function")
      allExpressions.current = newValue(allExpressions.current);
    else allExpressions.current = newValue;
    expressionIndex.current++;
  };

  const processCommand = async (command) => {
    setIsProcessing(true);
    setAllExpressions((prev) => [...prev, command]);
    setOutputLines((prev) => [...prev, `> ${command}`]);

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const typeLine = async (line, charDelay = 50) => {
      setOutputLines((prev) => [...prev, line[0] || ""]);
      if (line.length <= 1) return;
      for (let i = 1; i < line.length; i++) {
        await delay(charDelay);
        setOutputLines((prev) => {
          const lastLine = prev[prev.length - 1];
          return [...prev.slice(0, -1), lastLine + line[i]];
        });
      }
    };

    switch (command.toLowerCase().trim()) {
      case "help":
        setOutputLines((prev) => [
          ...prev,
          "Available commands:",
          "  run about.exe     - Display information about me",
          "  run betmen.exe    - Activate Betmen mode",
          "  clear             - Clear the terminal screen",
          "  help              - Show this help message",
          `  echo "expression" - Echo the text back`,
          "  run notsus.exe    - Defo not a sus",
          "  run quote.exe     - Motivation 🗿",
          "",
        ]);
        break;
      case "run about.exe":
        for (const line of aboutMeText) {
          await typeLine(line, 30);
        }
        setOutputLines((prev) => [...prev, ""]);
        break;
      case "run betmen.exe":
        await typeLine("Initializing Bat-Signal protocol...", 75);
        await delay(1000);
        await typeLine("WARNING: System instability detected!", 75);
        await delay(500);
        await typeLine("Unauthorized access attempt from...", 75);
        await typeLine(
          loc.current
            ? `${loc.current.city}  ${loc.current.ip}`
            : `"THE CAVES"`,
          75
        );
        await delay(1000);
        await typeLine("Memory integrity compromised...", 75);
        await delay(500);
        await typeLine("Core functions rerouting... Standby...", 75);
        await delay(1500);

        setOutputLines((prev) => [
          ...prev,
          "SYSTEM ALERT: CRITICAL FAILURE IMMINENT!",
        ]);
        await delay(300);
        setOutputLines((prev) => [
          ...prev,
          "SYSTEM ALERT: CRITICAL FAILURE IMMINENT!!",
        ]);
        await delay(300);
        setOutputLines((prev) => [
          ...prev,
          "SYSTEM ALERT: CRITICAL FAILURE IMMINENT!!!",
        ]);
        await delay(300);

        setOutputLines((prev) => [
          ...prev,
          "Initiating emergency visual override...",
        ]);
        await delay(1000);
        setOutputLines((prev) => [...prev, "[SYSTEM_SOUND: LOW_RUMBLE.WAV]"]);
        await delay(1000);

        setOutputLines((prev) => [...prev, "Reconfiguring reality matrix..."]);
        await delay(1000);
        setOutputLines((prev) => [
          ...prev,
          "Applying 'DARK_KNIGHT' visual theme...",
        ]);
        await delay(1500);

        setOutputLines(() => [""]);
        await delay(500);
        setOutputLines((prev) => [
          ...prev,
          "█████████████████████████████████████████████",
        ]);
        await delay(100);
        setOutputLines((prev) => [
          ...prev,
          "█████████████████████████████████████████████",
        ]);
        await delay(100);
        setOutputLines((prev) => [...prev, ""]);
        await delay(500);

        const batmanArt = [
          "===============================================",
          "               I'M BETMEN",
          "===============================================",
          "⠀⠀⠀⠀⠀⠀⢀⣀⡠⠤⠤⠴⠶⠶⠶⠶⠦⠤⠤⢄⣀⡀⠀⠀⠀⠀⠀⠀⠀",
          "⠀⠀⠀⣠⠖⢛⣩⣤⠂⠀⠀⠀⣶⡀⢀⣶⠀⠀⠀⠐⣤⣍⡛⠲⣄⠀⠀⠀⠀",
          "⢀⡴⢋⣴⣾⣿⣿⣿⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⠀⣿⣿⣿⣷⣦⡙⢦⡀⠀",
          "⡞⢠⣿⣿⣿⣿⣿⣿⣷⣤⣤⣴⣿⣿⣿⣿⣦⣤⣤⣾⣿⣿⣿⣿⣿⣿⡆⢳⠀",
          "⡁⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢈⠆",
          "⢧⡈⢿⣿⣿⣿⠿⠿⣿⡿⠿⠿⣿⣿⣿⣿⠿⠿⢿⣿⠿⠿⣿⣿⣿⡿⢁⡼⠀",
          "⠀⠳⢄⡙⠿⣇⠀⠀⠈⠁⠀⠀⠈⢿⡿⠁⠀⠀⠈⠁⠀⠀⣸⠿⢋⡠⠞⠀⠀",
          "⠀⠀⠀⠉⠲⢤⣀⡀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⢀⣀⡤⠖⠉⠀⠀⠀⠀",
          "⠀⠀⠀⠀⠀⠀⠈⠉⠉⠐⠒⠒⠒⠒⠒⠒⠒⠒⠒⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀",
          "",
        ];
        for (const line of batmanArt) {
          await typeLine(line, 10);
        }

        await delay(1000);
        await typeLine(
          "System integrity questionable. Proceed with caution.",
          75
        );
        await delay(500);
        await typeLine("The city is safe... for now.", 75);
        setOutputLines((prev) => [...prev, ""]);
        break;
      case "clear":
        setOutputLines([...initialMessage]);
        break;

      case "run notsus.exe":
        await typeLine("loadin heh 😼...", 50);
        await delay(500);
        setOutputLines((prev) => [...prev, ""]);
        asciiVideo(audioRef.current, (asciiFrame) => {
          if (!asciiFrame) {
            setOutputLines((prev) => {
              const frameIndex = prev.findIndex((line) =>
                line.startsWith("ASCII_FRAME_MARKER")
              );

              if (frameIndex >= 0) {
                //const newLines = [...prev.slice(0, frameIndex)];
                return [...initialMessage, ""];
              } else {
                return [...initialMessage, ""];
              }
            });
            return;
          }

          setOutputLines((prev) => {
            const frameIndex = prev.findIndex((line) =>
              line.startsWith("ASCII_FRAME_MARKER")
            );

            if (frameIndex >= 0) {
              const newLines = [...prev];
              newLines[frameIndex] = "ASCII_FRAME_MARKER" + asciiFrame;

              return newLines;
            } else {
              return [...prev, "ASCII_FRAME_MARKER" + asciiFrame];
            }
          });
        });
        break;

      case "run quote.exe":
        const randomQuote =
          randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
        await typeLine(randomQuote, 50);
        break;
      case "hello_world()":
        await typeLine("Print", 50);
        break;
      default:
        if (command?.startsWith("echo")) {
          const echoText = command.slice(5).trim();
          //evaluate the echoText to remove any HTML tags and escape characters
          let cleanedText = "";
          try {
            cleanedText = `${eval(echoText)}`; // Using template literals to evaluate the string
            setOutputLines((prev) => [...prev, cleanedText, ""]);
          } catch (e) {
            cleanedText = "Error: Invalid expression";
            setOutputLines((prev) => [
              ...prev,
              "Error:",
              `   ${echoText}`,
              `${Array.from({ length: echoText.length }, (_, i) => " ").join(
                ""
              )}^`,
              "Invalid expression.",
              "",
            ]);
          }
        } else {
          setOutputLines((prev) => [
            ...prev,
            "Error:",
            `   ${command}`,
            `${Array.from({ length: command.length }, (_, i) => " ").join(
              ""
            )}^`,
            `Invalid command. Type "help" for a list of commands.`,
          ]);
        }
    }
    setIsProcessing(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //blah blah blah blah blah blah
  const handleInputSubmit = (e) => {
    if (e.key === "Enter" && !isProcessing) {
      e.preventDefault();
      processCommand(inputValue);
      setInputValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (allExpressions.current?.length > 0) {
        const next = allExpressions.current[expressionIndex.current];
        setInputValue(next ? next : "");
        if (!next) return;
        expressionIndex.current =
          expressionIndex.current === 0 ? 0 : expressionIndex.current - 1;
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (inputValue === "") {
        return;
      }
      expressionIndex.current =
        expressionIndex.current + 1 >= allExpressions.current.length - 1
          ? allExpressions.current.length - 1
          : expressionIndex.current + 1;
      const next = allExpressions.current[expressionIndex.current];
      if (next === undefined || next === inputValue) return setInputValue("");
      setInputValue(next ? next : "");
    }
  };

  useEffect(() => {
    document.head
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#000000");
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [outputLines]);

  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  return (
    <div
      className={styles.terminalContainer}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={styles.terminalScreen}>
        <div className={styles.terminalOutput}>
          {outputLines?.map((line, index) => (
            <div key={index} className={styles.line}>
              {line?.startsWith("> ") ? (
                line
              ) : line?.startsWith("ASCII_FRAME_MARKER") ? (
                <pre className={styles.asciiArt}>
                  {line.replace("ASCII_FRAME_MARKER", "")}
                </pre>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html:"&nbsp;"+line?.replace(/ /g, "&nbsp;"),
                  }}
                />
              )}
            </div>
          ))}
          {!isProcessing && (
            <div className={styles.inputLine}>
              <span className={styles.prompt}>&gt; </span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputSubmit}
                className={styles.terminalInput}
                disabled={isProcessing}
                spellCheck="false"
                style={{ width: `${inputValue?.length}ch` }}
              />
              <span className={styles.cursor}></span>
            </div>
          )}
        </div>
        <div ref={terminalEndRef}></div>
      </div>
      <div className={styles.scanlineEffect}></div>
      <div className={styles.vignetteEffect}></div>
    </div>
  );
}
