import React, { useEffect, useState, ReactNode, createContext, useContext } from 'react';

// Опис властивостей провайдера
interface WindowWidthProviderProps {
  children: ReactNode;
}

// Опис значень, які будуть доступні через контекст
export interface WindowWidthContextValue {
  windowWidth: number;
  breakpointsForMarkup: {
    isNothing: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

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

  // Опис значень, які будуть передані через контекст
  const breakpointsForMarkup = {
    isNothing: windowWidth <= 319,
    isMobile: windowWidth >= 320 && windowWidth <= 767,
    isTablet: windowWidth >= 768 && windowWidth <= 1279,
    isDesktop: windowWidth >= 1280,
  };
  // Значення контексту, яке буде надано дітям через `WindowWidthContext.Provider`
  const contextValue: WindowWidthContextValue = {
    windowWidth,
    breakpointsForMarkup,
  };

  return <WindowWidthContext.Provider value={contextValue}>{children}</WindowWidthContext.Provider>;
};

// Користувацька гілка для використання значень контексту
export const useWindowWidth = (): WindowWidthContextValue | null => {
  const context = useContext(WindowWidthContext);

  if (!context) {
    throw new Error('useWindowWidth must be used within a WindowWidthProvider');
  }
  return context;
};
