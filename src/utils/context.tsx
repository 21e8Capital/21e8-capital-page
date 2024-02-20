import React, {
  useState,
  Dispatch,
  ReactNode,
  useContext,
  createContext,
  SetStateAction,
  useEffect,
} from "react";
import { useRouter } from "next/router";

interface ContextProps {
  isBurgerActive: boolean;
  setIsBurgerActive: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const contextValue: ContextProps = {
    isBurgerActive,
    setIsBurgerActive,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useContextState = (): ContextProps => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  return context;
};

export { useContextState, ContextProvider };
