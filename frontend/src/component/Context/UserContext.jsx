import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </Context.Provider>
  );
};