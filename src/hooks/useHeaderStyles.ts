import { useEffect, useState } from 'react';

import { useWindowWidthContext } from 'contexts';

import { getHeaderHeight } from 'helpers';

const useHeaderStyles = (isHomePage: boolean | undefined) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { isTablet, isDesktop, isTV } = useWindowWidthContext();
  const headerHeight = getHeaderHeight(isTablet, isDesktop, isTV);

  const screenHeight = window.innerHeight;

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const currentScroll = window.scrollY;

        const isScrolling = currentScroll > screenHeight - headerHeight;
        setIsScrolled(isScrolling);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [isHomePage, screenHeight]);

  const getHeaderClass = () => {
    return isScrolled
      ? 'bg-whiteBase/[.8] dark:bg-darkBackground/[.8] border-b'
      : 'bg-transparent border-0';
  };

  const getTextClass = () => {
    return isScrolled
      ? 'text-darkBase dark:text-whiteBase drop-shadow-none'
      : 'text-whiteBase [text-shadow:8px_10px_20px_rgba(17,19,33,.5)]';
  };

  const getAccountIconStyles = () => {
    return isScrolled
      ? 'fill-darkBase dark:fill-whiteBase group-hover:fill-accentBase group-focus:fill-accentBase'
      : 'fill-whiteBase group-hover:fill-accentBase group-focus:fill-accentBase';
  };

  const getBurgerMenuButtonClass = () => {
    return isScrolled ? 'stroke-darkBase dark:stroke-whiteBase' : 'stroke-whiteBase';
  };

  const getAuthButtonClass = () => {
    return isScrolled ? '' : 'shadow-darkCard';
  };

  const getThemeSwitcherTextClass = () => {
    return isHomePage && isScrolled ? '' : '[text-shadow:8px_10px_20px_rgba(17,19,33,.5)]';
  };

  const headerClass = getHeaderClass();
  const textClass = getTextClass();
  const accountIconStyles = getAccountIconStyles();
  const burgerMenuButtonClass = getBurgerMenuButtonClass();
  const authButtonClass = getAuthButtonClass();
  const themeSwitcherTextClass = getThemeSwitcherTextClass();

  return {
    headerClass,
    textClass,
    burgerMenuButtonClass,
    accountIconStyles,
    authButtonClass,
    themeSwitcherTextClass,
  };
};

export default useHeaderStyles;
