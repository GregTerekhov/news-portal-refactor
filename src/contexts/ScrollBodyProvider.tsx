import React, {
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IScrollBodyContextProps {
  children: ReactNode;
}

interface IScrollBodyContext {
  isScrollDisabled: boolean;
  setIsScrollDisabled: (value: SetStateAction<boolean>) => void;
}

const ScrollBodyContext = createContext<IScrollBodyContext | undefined>(undefined);

export const ScrollBodyProvider: FC<IScrollBodyContextProps> = ({ children }) => {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);

  //Надавання стиля body в залежності від стану скрола
  useEffect(() => {
    if (isScrollDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isScrollDisabled]);

  return (
    <ScrollBodyContext.Provider value={{ isScrollDisabled, setIsScrollDisabled }}>
      {children}
    </ScrollBodyContext.Provider>
  );
};

export const useScrollBodyContext = () => {
  const context = useContext(ScrollBodyContext);

  if (!context) {
    throw new Error('useScrollBodyContext must be used within a ScrollBodyProvider');
  }
  return context;
};
