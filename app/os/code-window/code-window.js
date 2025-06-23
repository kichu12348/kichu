import React, { useState, useRef } from "react";
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
    const workerCode = `
      self.onmessage = function(e) {
        const code = e.data;
        const originalConsole = console;
        const logs = [];
        
        // Override console methods
        console.log = (...args) => logs.push({ type: 'log', args });
        console.error = (...args) => logs.push({ type: 'error', args });
        console.warn = (...args) => logs.push({ type: 'warn', args });
        console.info = (...args) => logs.push({ type: 'info', args });
        
        try {
          eval(code);
          self.postMessage({ success: true, logs });
        } catch (error) {
          logs.push({ type: 'error', args: [error.message] });
          self.postMessage({ success: false, logs });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: "application/javascript" });
    workerRef.current = new Worker(URL.createObjectURL(blob));

    workerRef.current.onmessage = (e) => {
      const { logs } = e.data;
      setOutput(logs);
      setIsRunning(false);
      workerRef.current.terminate();
      URL.revokeObjectURL(workerRef.current);
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
