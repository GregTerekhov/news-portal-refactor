import React, { useEffect, useState, ReactNode, createContext, useContext } from 'react';

// Опис властивостей провайдера
interface WindowWidthProviderProps {
  children: ReactNode;
}

// Опис значень, які будуть доступні через контекст
export interface WindowWidthContextValue {
  windowWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isNotMobile: boolean;
  isDesktop: boolean;
  isTV: boolean;
  wideScreens: boolean;
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

  // Опис значень, які будуть передані через контекст
  const isMobile = breakpointsForMarkup.isNothing || breakpointsForMarkup.isMobile;
  const isNotMobile =
    breakpointsForMarkup.isTablet || breakpointsForMarkup.isDesktop || breakpointsForMarkup.isTV;
  const isTablet = breakpointsForMarkup.isTablet;
  const wideScreens = breakpointsForMarkup.isDesktop || breakpointsForMarkup.isTV;
  const isDesktop = breakpointsForMarkup.isDesktop;
  const isTV = breakpointsForMarkup.isTV;

  // Значення контексту, яке буде надано дітям через `WindowWidthContext.Provider`
  const contextValue: WindowWidthContextValue = {
    windowWidth,
    isMobile,
    isNotMobile,
    isTablet,
    isDesktop,
    isTV,
    wideScreens,
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
