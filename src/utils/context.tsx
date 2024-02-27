import React, {
  useState,
  Dispatch,
  ReactNode,
  useContext,
  createContext,
  SetStateAction,
  useEffect,
} from "react";
import { getHalvingData } from "./api/halving-and-emission";

interface ContextProps {
  isBurgerActive: boolean;
  setIsBurgerActive: Dispatch<SetStateAction<boolean>>;
  halving: any;
  setHalving: Dispatch<SetStateAction<any>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [halving, setHalving] = useState({});
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const handleHalvening = async () => {
    const data = await getHalvingData("btc");
    setHalving(data);
  };

  useEffect(() => {
    handleHalvening();
  }, []);

  const contextValue: ContextProps = {
    isBurgerActive,
    setIsBurgerActive,
    halving,
    setHalving,
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
