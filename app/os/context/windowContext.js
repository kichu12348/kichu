import { createContext, useContext, useRef } from "react";
const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const windowFocusFunctionsMap = useRef(new Map());

  return (
    <WindowContext.Provider
      value={{
        windowFocusFunctionsMap,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => useContext(WindowContext);
