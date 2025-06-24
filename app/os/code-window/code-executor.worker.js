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
