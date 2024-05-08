import React, { useEffect, useState, ReactNode, createContext, useContext } from 'react';

// Опис властивостей провайдера
interface WindowWidthProviderProps {
  children: ReactNode;
}

// Опис значень, які будуть доступні через контекст
export interface WindowWidthContextValue {
  windowWidth: number;
  isSmallScreens: boolean;
  isTablet: boolean;
  isNotMobile: boolean;
  isDesktop: boolean;
  isTV: boolean;
  isWideScreens: boolean;
}

const LESS_THAN_MOBILE = 319;
const IS_MOBILE = 320;
const LESS_THAN_TABLET = 767;
const IS_TABLET = 768;
const LESS_THAN_DESKTOP = 1279;
const IS_DESKTOP = 1280;
const LESS_THAN_TV = 1535;
const IS_TV = 1536;

// Створення контексту з типом `WindowWidthContextValue`
export const WindowWidthContext = createContext<WindowWidthContextValue | null>(null);

// Компонент-провайдер, який надає значення контексту своїм дітям
export const WindowWidthProvider: React.FC<WindowWidthProviderProps> = ({ children }) => {
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
    isNothing: windowWidth <= LESS_THAN_MOBILE,
    isMobile: windowWidth >= IS_MOBILE && windowWidth <= LESS_THAN_TABLET,
    isTablet: windowWidth >= IS_TABLET && windowWidth <= LESS_THAN_DESKTOP,
    isDesktop: windowWidth >= IS_DESKTOP && windowWidth <= LESS_THAN_TV,
    isTV: windowWidth >= IS_TV,
  };

  const { isNothing, isMobile, isTablet, isDesktop, isTV } = breakpointsForMarkup;

  // Опис значень, які будуть передані через контекст
  const isSmallScreens = isNothing || isMobile;
  const isNotMobile = isTablet || isDesktop || isTV;
  const isWideScreens = isDesktop || isTV;

  // Значення контексту, яке буде надано дітям через `WindowWidthContext.Provider`
  const contextValue: WindowWidthContextValue = {
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
