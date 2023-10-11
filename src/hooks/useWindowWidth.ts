import { useContext } from 'react';
import { WindowWidthContext, WindowWidthContextValue } from 'contexts';

// Користувацька гілка для використання значень контексту
export const useWindowWidth = (): WindowWidthContextValue | null => {
  return useContext(WindowWidthContext);
};
