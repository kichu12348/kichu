import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FaPlay, FaTimes } from "react-icons/fa";
import styles from "./code-window.module.css";

function CodeEditor() {
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);
  const workerRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const executeCode = () => {
    if (!editorRef.current || isRunning) return;

    const code = editorRef.current.getValue();
    setIsRunning(true);
    setOutput([]);
    setShowOutput(true);

    // Create Web Worker for code execution
    workerRef.current = new Worker(new URL('./code-executor.worker.js', import.meta.url));

    workerRef.current.onmessage = (e) => {
      const { logs } = e.data;
      setOutput(logs);
      setIsRunning(false);
      workerRef.current.terminate();
    };

    workerRef.current.onerror = (error) => {
      setOutput([{ type: "error", args: ["Worker error: " + error.message] }]);
      setIsRunning(false);
    };

    workerRef.current.postMessage(code);
  };

  const closeOutput = () => {
    setShowOutput(false);
    if (workerRef.current) {
      workerRef.current.terminate();
      setIsRunning(false);
    }
  };

  const formatOutput = (args) => {
    return args
      .map((arg) => {
        if (typeof arg === "object") {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(" ");
  };


  useEffect(()=>{
    const handleCtrlS = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        executeCode();
      }
    }
    document.addEventListener("keydown", handleCtrlS);
  },[]);

  return (
    <div className={styles.codeEditor}>
      <div className={styles.header}>
        <button
          className={styles.runButton}
          onClick={executeCode}
          disabled={isRunning}
        >
          <FaPlay className={styles.playIcon} />
          {isRunning ? "Running..." : "Run"}
        </button>
      </div>

      <div className={styles.editorContainer}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={`//kichu is betmen
console.log("Hello, World!");`}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: "on",
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {showOutput && (
        <div className={styles.outputOverlay}>
          <div className={styles.outputWindow}>
            <div className={styles.outputHeader}>
              <span className={styles.outputTitle}>Output</span>
              <button className={styles.closeButton} onClick={closeOutput}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.outputContent}>
              {output.length === 0 && isRunning && (
                <div className={styles.outputLine}>
                  <span className={styles.loading}>Executing...</span>
                </div>
              )}
              {output.map((log, index) => (
                <div
                  key={index}
                  className={`${styles.outputLine} ${styles[log.type]}`}
                >
                  <span className={styles.outputText}>
                    {formatOutput(log.args)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
