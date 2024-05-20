import React, {
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ThemeValue } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';

interface IThemeContextProps {
  children: ReactNode;
}

interface IThemeContext {
  enabled: boolean;
  setEnabled: (value: SetStateAction<boolean>) => void;
  handleThemeChange: () => Promise<void>;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider: FC<IThemeContextProps> = ({ children }) => {
  const [enabled, setEnabled] = useState(false);

  const { isAuthenticated, unauthorisedChangeTheme, changeTheme, userTheme } = useAuthRedux();

  useEffect(() => {
    if (userTheme === ThemeValue.Dark) {
      setEnabled(true);
      document.documentElement.classList.add(ThemeValue.Dark);
    } else {
      setEnabled(false);
      document.documentElement.classList.remove(ThemeValue.Dark);
    }
  }, [userTheme]);

  //Зміна стану теми
  const handleThemeChange = async (): Promise<void> => {
    const newTheme = !enabled;
    setEnabled(newTheme);

    if (newTheme) {
      document.documentElement.classList.add(ThemeValue.Dark);
      isAuthenticated
        ? changeTheme({ updatedTheme: ThemeValue.Dark })
        : unauthorisedChangeTheme({ updatedTheme: ThemeValue.Dark });
    } else {
      document.documentElement.classList.remove(ThemeValue.Dark);
      isAuthenticated
        ? changeTheme({ updatedTheme: ThemeValue.Light })
        : unauthorisedChangeTheme({ updatedTheme: ThemeValue.Light });
    }
  };

  return (
    <ThemeContext.Provider value={{ enabled, setEnabled, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
