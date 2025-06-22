import React, { useState, useRef, useEffect } from 'react'
import styles from './terminal-window.module.css'

const aboutMeText = [
  "I'm a full-stack developer currently pursuing Computer",
  "Science Engineering at College of Engineering Chengannur. With",
  "expertise in modern web technologies and a strong foundation in",
  "systems programming, I build scalable, efficient solutions that",
  "solve real-world problems.",
  "",
];

const initialMessage = [
  "[Version 24.02.05]",
  "(c) Kichu Not Evil Corp. All rights reserved.",
  `Type "help" for a list of commands.`,
  "",
];


function Terminal({openWindow}) {
  const [outputLines, setOutputLines] = useState([...initialMessage])
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef(null)
  const contentRef = useRef(null)
  const terminalEndRef = useRef(null)
  const expressionIndex = useRef(-1)
  const allExpressions = useRef([])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [outputLines])

  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isProcessing])

  const setAllExpressions = (newValue) => {
    if (typeof newValue === "function")
      allExpressions.current = newValue(allExpressions.current);
    else allExpressions.current = newValue;
    expressionIndex.current++;
  };

  const processCommand = async (command) => {
    setIsProcessing(true)
    setAllExpressions((prev) => [...prev, command])
    setOutputLines((prev) => [...prev, `> ${command}`])

    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    const typeLine = async (line, charDelay = 50) => {
      setOutputLines((prev) => [...prev, line[0] || ""])
      if (line.length <= 1) return
      for (let i = 1; i < line.length; i++) {
        await delay(charDelay)
        setOutputLines((prev) => {
          const lastLine = prev[prev.length - 1]
          return [...prev.slice(0, -1), lastLine + line[i]]
        })
      }
    }

    switch (command.toLowerCase().trim()) {
      case 'help':
        setOutputLines((prev) => [
          ...prev,
          "Available commands:",
          "  run about.exe     - Display information about me",
          "  run betmen.exe    - Activate Betmen mode",
          "  ls                - List directories",
          "  open dir_name     - Open the specified directory",
          "  clear             - Clear the terminal screen",
          "  help              - Show this help message",
          `  echo "expression" - Echo the text back`,
          "  date              - Show current date",
          "  time              - Show current time",
          "  ver               - Show version info",
          "",
        ])
        break
      
      case 'run about.exe':
        for (const line of aboutMeText) {
          await typeLine(line, 30)
        }
        setOutputLines((prev) => [...prev, ""])
        break
      
      case 'run betmen.exe':
        await typeLine("Initializing Bat-Signal protocol...", 75)
        await delay(1000)
        await typeLine("WARNING: System instability detected!", 75)
        await delay(500)
        
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
        ]
        for (const line of batmanArt) {
          await typeLine(line, 10)
        }
        await delay(500)
        await typeLine("The city is safe... for now.", 75)
        setOutputLines((prev) => [...prev, ""])
        break
      
      case 'ls':
        setOutputLines((prev) => [
          ...prev,
          "",
          "  About Me",
          "  Projects", 
          "  Contact",
          "",
        ])
        break
      
      case 'clear':
        setOutputLines([...initialMessage])
        break
      
      case 'date':
        setOutputLines((prev) => [...prev, `Current date: ${new Date().toDateString()}`, ''])
        break
      
      case 'time':
        setOutputLines((prev) => [...prev, `Current time: ${new Date().toLocaleTimeString()}`, ''])
        break
      
      case 'ver':
        setOutputLines((prev) => [...prev, '[Version 24.02.05]', ''])
        break
      
      case '':
        setOutputLines((prev) => [...prev, ''])
        break
      
      default:
        if (command?.startsWith("echo")) {
          const echoText = command.slice(5).trim()
          let cleanedText = ""
          try {
            cleanedText = `${eval(echoText)}`
            setOutputLines((prev) => [...prev, cleanedText, ""])
          } catch (e) {
            cleanedText = "Error: Invalid expression"
            setOutputLines((prev) => [
              ...prev,
              "Error:",
              `   ${echoText}`,
              `${Array.from({ length: echoText.length }, (_, i) => " ").join("")}^`,
              "Invalid expression.",
              "",
            ])
          }
        } 
        
        else if (command?.startsWith("open ")) {
            const appName = command.slice(5).trim()
            if (appName === "about me" || appName === "about") {
                openWindow("about")
                setOutputLines((prev) => [...prev, `Opening ${appName}...`, ""])
            } else if (appName === "projects" || appName === "Projects") {
                openWindow("projects")
                setOutputLines((prev) => [...prev, `Opening ${appName}...`, ""])
            } else if (appName === "contact") {
                openWindow("contact")
                setOutputLines((prev) => [...prev, `Opening ${appName}...`, ""])
            } else {
                setOutputLines((prev) => [
                ...prev,
                `Error: Application "${appName}" not found.`,
                "",
                ])
            }
        }
        else {
          setOutputLines((prev) => [
            ...prev,
            "Error:",
            `   ${command}`,
            `${Array.from({ length: command.length }, (_, i) => " ").join("")}^`,
            `Invalid command. Type "help" for a list of commands.`,
            ""
          ])
        }
    }
    setIsProcessing(false)
  }

  const handleInputChange = (e) => {
    if (isProcessing) return
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      e.preventDefault()
      processCommand(inputValue)
      setInputValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (allExpressions.current?.length > 0) {
        const next = allExpressions.current[expressionIndex.current]
        setInputValue(next ? next : "")
        if (!next) return
        expressionIndex.current = expressionIndex.current === 0 ? 0 : expressionIndex.current - 1
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (inputValue === "") return
      expressionIndex.current = expressionIndex.current + 1 >= allExpressions.current.length - 1
        ? allExpressions.current.length - 1
        : expressionIndex.current + 1
      const next = allExpressions.current[expressionIndex.current]
      if (next === undefined || next === inputValue) return setInputValue("")
      setInputValue(next ? next : "")
    }
  }

  return (
    <div 
      className={styles.terminalWindow}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={styles.terminalContent} ref={contentRef}>
        <div className={styles.terminalOutput}>
          {outputLines?.map((line, index) => (
            <div key={index} className={styles.terminalLine}>
              {line?.startsWith("> ") ? (
                line
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: "&nbsp;" + line?.replace(/ /g, "&nbsp;"),
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
                onKeyDown={handleKeyDown}
                className={styles.terminalInput}
                disabled={isProcessing}
                spellCheck="false"
                style={{ width: `${Math.max(inputValue?.length || 0, 1)}ch` }}
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
  )
}

export default Terminal