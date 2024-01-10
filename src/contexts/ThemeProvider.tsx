import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

type ThemeContextProps = {
  children: ReactNode;
};

type ThemeContextValue = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  handleThemeChange: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: FC<ThemeContextProps> = ({ children }) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const { isAuthenticated, unauthorisedChangeTheme, changeTheme, userTheme } = useAuthRedux();

  useEffect(() => {
    if (userTheme && userTheme === 'dark') {
      setEnabled(true);
      document.documentElement.classList.add('dark');
    } else {
      setEnabled(false);
      document.documentElement.classList.remove('dark');
    }
  }, [userTheme]);

  const handleThemeChange = async () => {
    const newTheme = !enabled;
    setEnabled(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      if (!isAuthenticated) {
        unauthorisedChangeTheme({ updatedTheme: 'dark' });
      } else {
        changeTheme({ updatedTheme: 'dark' });
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (!isAuthenticated) {
        unauthorisedChangeTheme({ updatedTheme: 'light' });
      } else {
        changeTheme({ updatedTheme: 'light' });
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ enabled, setEnabled, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
