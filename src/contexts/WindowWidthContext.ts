import { createContext } from 'react';

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
