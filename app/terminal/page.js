"use client";
import styles from "./terminal.module.css";
import { useEffect, useState, useRef} from "react";

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
  "(c) Kichu Corp. All rights reserved.",
  `Type "help" for a list of commands.`,
  "",
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
  },[]);

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
        await typeLine(loc.current?`${loc.current.city}  ${loc.current.ip}`:`"THE CAVES"`, 75);
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
          "██████████████████████████████████████████████████",
        ]);
        await delay(100);
        setOutputLines((prev) => [
          ...prev,
          "██████████████████████████████████████████████████",
        ]);
        await delay(100);
        setOutputLines((prev) => [...prev, ""]);
        await delay(500);

        const batmanArt = [
          "==================================================",
          "               I'M BETMEN",
          "==================================================",
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
          {outputLines.map((line, index) => (
            <div key={index} className={styles.line}>
              {line?.startsWith("> ") ? (
                line
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: line?.replace(/ /g, "&nbsp;"),
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
