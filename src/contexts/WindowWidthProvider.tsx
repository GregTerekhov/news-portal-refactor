import React, { useEffect, useState, ReactNode } from 'react';
import {
  WindowWidthContext,
  WindowWidthContextValue,
} from './WindowWidthContext';

// Опис властивостей провайдера
type WindowWidthProviderProps = {
  children: ReactNode;
};

// Компонент-провайдер, який надає значення контексту своїм дітям
export const WindowWidthProvider: React.FC<WindowWidthProviderProps> = ({
  children,
}) => {
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

  return (
    <WindowWidthContext.Provider value={contextValue}>
      {children}
    </WindowWidthContext.Provider>
  );
};
