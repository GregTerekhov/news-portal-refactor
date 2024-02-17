import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type ScrollBodyContextProps = {
  children: ReactNode;
};

type ScrollBodyContextValue = {
  isScrollDisabled: boolean;
  setIsScrollDisabled: (value: boolean) => void;
};

const ScrollBodyContext = createContext<ScrollBodyContextValue | undefined>(undefined);

export const ScrollBodyProvider = ({ children }: ScrollBodyContextProps) => {
  const [isScrollDisabled, setIsScrollDisabled] = useState<boolean>(false);

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
    throw new Error('usePopUp must be used within a ScrollBodyProvider');
  }
  return context;
};
