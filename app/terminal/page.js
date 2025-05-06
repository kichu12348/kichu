"use client";
import styles from "./terminal.module.css";
import { useEffect, useState, useRef } from "react";

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
];

const initialMessage = [
  "[Version 20.5.6]",
  "(c) Kichu Corp. All rights reserved.",
  "Type 'help' for a list of commands.",
  "",
];

export default function Terminal() {
  const [outputLines, setOutputLines] = useState([...initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const processCommand = async (command) => {
    setIsProcessing(true);
    setOutputLines((prev) => [...prev, `> ${command}`]);

    // Simulate delay for realism
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    switch (command.toLowerCase().trim()) {
      case "help":
        setOutputLines((prev) => [
          ...prev,
          "Available commands:",
          "  start about.exe   - Display information about me",
          "  run betmen.exe    - Activate Batman mode",
          "  clear             - Clear the terminal screen",
          "  help              - Show this help message",
          "",
        ]);
        break;
      case "start about.exe":
        for (const line of aboutMeText) {
          await delay(50);
          setOutputLines((prev) => [...prev, line]);
        }
        setOutputLines((prev) => [...prev, ""]);
        break;
      case "run betmen.exe":
        setOutputLines((prev) => [
          ...prev,
          "Initializing Bat-Signal protocol...",
        ]);
        await delay(1000);
        setOutputLines((prev) => [
          ...prev,
          "WARNING: System instability detected!",
        ]);
        await delay(1000);
        setOutputLines((prev) => [...prev, "Memory integrity compromised..."]);
        await delay(1500);
        setOutputLines((prev) => [...prev, "Reconfiguring reality matrix..."]);
        await delay(1000);
        setOutputLines((prev) => [...prev, ""]);
        // Clear screen for dramatic effect
        setOutputLines(() => [""]);
        await delay(500);

        const batmanArt = [
          "==================================================",
          "               HELLO BATMAN",
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
          "System integrity questionable. Proceed with caution.",
          "",
        ];
        for (const line of batmanArt) {
          await delay(100);
          setOutputLines((prev) => [...prev, line]);
        }
        break;
      case "clear":
        setOutputLines([...initialMessage]);
        break;
      //   case command.includes("echo"):
      //     const echoText = command.slice(5).trim(); // Remove 'echo ' from the command
      //     //remove extra spaces and "" or '' from the text
      //     const cleanedText = echoText
      //       .replace(/['"]+/g, "")
      //       .replace(/\s+/g, " ")
      //       .trim();
      //     setOutputLines((prev) => [...prev, `> ${command}`, cleanedText, ""]);
      //     break;
      default:
        if (command.startsWith("echo")) {
          const echoText = command.slice(5).trim(); // Remove 'echo ' from the command
          //remove extra spaces and "" or '' from the text
          const cleanedText = echoText
            .replace(/['"]+/g, "")
            .replace(/\s+/g, " ")
            .trim();
          setOutputLines((prev) => [...prev, cleanedText, ""]);
        } else {
          setOutputLines((prev) => [
            ...prev,
            `Error: Command not recognized: ${command}`,
            "",
          ]);
        }
    }
    setIsProcessing(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === "Enter" && !isProcessing) {
      e.preventDefault();
      processCommand(inputValue);
      setInputValue("");
    }
  };

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
              {/* Basic way to check if it's a user command line */}
              {line.startsWith("> ") ? (
                line
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: line.replace(/ /g, "&nbsp;"),
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
                style={{ width: `${inputValue.length}ch` }} // Adjust width based on input length
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
