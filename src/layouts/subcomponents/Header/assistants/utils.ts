//Функція визначення id для меню в залежності від розміщення
export const getNavId = (isAccountPages: boolean): string => {
  return isAccountPages ? 'account-navigation' : 'main-navigation';
};

export const getAriaLabel = (isOpenMenu: boolean, isAccountPages: boolean): string => {
  if (!isOpenMenu && !isAccountPages) {
    return 'Open mobile';
  } else if (isOpenMenu && !isAccountPages) {
    return 'Close mobile';
  } else if (!isOpenMenu && isAccountPages) {
    return 'Open account';
  } else if (isOpenMenu && isAccountPages) {
    return 'Close account';
  }
  return '';
};

export const getIconStyles = (
  isOpenMenu: boolean,
  isHomeActive: boolean,
  burgerMenuButtonClass: string,
): string =>
  `hocus:stroke-accentBase dark:hocus:stroke-accentBase ${
    !isOpenMenu && isHomeActive
      ? burgerMenuButtonClass
      : 'stroke-darkBase hocus:stroke-accentBase dark:stroke-whiteBase '
  }`;

export const renderButtonText = (wideScreens: boolean, isAuthenticated: boolean) => {
  return wideScreens ? (isAuthenticated ? 'Sign Out' : 'Auth') : null;
};

export const getButtonStyles = (
  isHomeActive: boolean,
  authButtonClass: string,
  wideScreens: boolean,
): string =>
  `${isHomeActive && authButtonClass} ${
    wideScreens ? '' : 'border-transparent p-1.5'
  } border border-solid border-transparent dark:border-whiteBase bg-accentBase hocus:bg-accentAlt`;

export const getHeaderStyles = (
  isHomeActive: boolean,
  headerClass: string,
  isOpenMenu: boolean,
  isOpenModal: boolean,
): string =>
  `fixed left-0 top-0 flex min-h-81px w-full items-center justify-center md:min-h-106px lg:min-h-113px hg:min-h-136px ${
    isHomeActive
      ? headerClass
      : 'border-b border-solid border-fullDark/[.2] bg-whiteBase/[.8] dark:border-whiteBase/[.2] dark:bg-darkBackground/[.8]'
  } transition-all duration-100 ${isOpenMenu ? 'border-b-0' : ''} ${
    isOpenModal ? 'pointer-events-none z-0' : 'pointer-events-auto z-50'
  }`;

export const getLogoLinkStyles = (
  isHomeActive: boolean,
  textClass: string,
  isOpenMenu: boolean,
): string =>
  `${
    isHomeActive && !isOpenMenu ? textClass : 'text-darkBase dark:text-whiteBase'
  } z-50 text-3xl font-bold leading-tight transition-colors duration-500 sm:py-6 md:pb-[30px] md:pt-8 md:text-4xl lg:py-7 lg:text-giant lg:leading-[1.357144]`;
