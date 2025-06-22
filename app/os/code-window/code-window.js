import React from "react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue=
{`//kichu is betmen
console.log("Hello, World!");`
}
      theme="vs-dark"
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: "on",
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
}

export default CodeEditor;
