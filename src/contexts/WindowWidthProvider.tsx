import React, { useEffect, useState, ReactNode, createContext, useContext } from 'react';

import { BreakpointValue } from 'types';

// Опис властивостей провайдера
interface IWindowWidthProviderProps {
  children: ReactNode;
}

// Опис значень, які будуть доступні через контекст
interface IWindowWidthContext {
  windowWidth: number;
  isSmallScreens: boolean;
  isTablet: boolean;
  isNotMobile: boolean;
  isDesktop: boolean;
  isTV: boolean;
  isWideScreens: boolean;
}

// Створення контексту з типом `WindowWidthContextValue`
const WindowWidthContext = createContext<IWindowWidthContext | null>(null);

// Компонент-провайдер, який надає значення контексту своїм дітям
export const WindowWidthProvider: React.FC<IWindowWidthProviderProps> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setWindowWidth]);

  // Визначення значень ключей об'єкта breakpointsForMarkup
  const breakpointsForMarkup = {
    isNothing: windowWidth <= BreakpointValue.TinyLimit,
    isMobile: windowWidth >= BreakpointValue.Mobile && windowWidth <= BreakpointValue.MobileLimit,
    isTablet: windowWidth >= BreakpointValue.Tablet && windowWidth <= BreakpointValue.TabletLimit,
    isDesktop:
      windowWidth >= BreakpointValue.Desktop && windowWidth <= BreakpointValue.DesktopLimit,
    isTV: windowWidth >= BreakpointValue.TV,
  };

  const { isNothing, isMobile, isTablet, isDesktop, isTV } = breakpointsForMarkup;

  // Опис значень, які будуть передані через контекст
  const isSmallScreens = isNothing || isMobile;
  const isNotMobile = isTablet || isDesktop || isTV;
  const isWideScreens = isDesktop || isTV;

  // Значення контексту, яке буде надано дітям через `WindowWidthContext.Provider`
  const contextValue: IWindowWidthContext = {
    windowWidth,
    isSmallScreens,
    isNotMobile,
    isTablet,
    isDesktop,
    isTV,
    isWideScreens,
  };

  return <WindowWidthContext.Provider value={contextValue}>{children}</WindowWidthContext.Provider>;
};

// Користувацька гілка для використання значень контексту
export const useWindowWidthContext = () => {
  const context = useContext(WindowWidthContext);

  if (!context) {
    throw new Error('useWindowWidthContext must be used within a WindowWidthProvider');
  }
  return context;
};
