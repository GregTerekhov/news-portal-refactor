import { NavId } from 'types';

export const getNavLinkStyles = (isActiveLink: boolean | undefined): string => {
  const commonClasses =
    'flex items-center p-1.5 text-medium font-medium transition-colors duration-500 md:font-bold lg:text-xl';

  let specificClasses = '';

  if (isActiveLink) {
    specificClasses = '[clip-path:inset(0 -100vmax)] justify-between bg-accentBase text-whiteBase';
  } else {
    specificClasses = 'text-darkBase dark:text-whiteBase';
  }
  return `${commonClasses} ${specificClasses}`;
};

export const getSvgWrapperStyles = (isActiveLink: boolean | undefined): string => {
  return `flex h-8 w-8 items-center justify-center rounded-full bg-accentBase transition-colors duration-500 ${
    isActiveLink ? 'outline outline-1 outline-whiteBase' : ''
  }`;
};

export const getNavLinkVersaStyles = (
  isActiveLink: boolean | undefined,
  isHomeActive: boolean,
  navId: NavId,
  textClass: string,
): string => {
  const commonClasses =
    'text-medium font-medium transition-colors duration-500 md:font-bold lg:text-xl hg:text-3xl';

  let specificClasses = '';

  if (navId === NavId.Account) {
    specificClasses =
      'group flex items-center gap-3.5 px-2 py-1.5 text-darkBase hocus:bg-accentBase hocus:text-whiteBase dark:text-whiteBase';
  } else {
    specificClasses = `relative pb-8 pt-12 hocus:text-accentBase dark:hocus:text-accentBase lg:pb-[33px] lg:pt-[55px] ${
      isActiveLink
        ? 'text-accentBase'
        : isHomeActive
          ? textClass
          : 'text-darkBase dark:text-whiteBase'
    }`;
  }
  return `${commonClasses} ${specificClasses}`;
};

export const getMobileLinksListStyles = (navId: NavId): string =>
  `space-y-3 ${
    navId === NavId.Account
      ? 'after:mt-3 after:block after:h-px after:w-full after:bg-accentBase after:content-[""]'
      : ''
  }`;

export const getMobileIconStyles = (navId: NavId): string =>
  `${navId === NavId.Main ? 'fill-transparent stroke-whiteBase' : 'fill-whiteBase'}`;

export const getMobileContainerWrapperStyles = (isOpen: boolean): string =>
  `before:h-81px fixed top-0 z-45 h-screen w-screen overflow-auto bg-whiteBase pb-[18px] pt-[147px] transition-all duration-500 before:fixed before:left-0 before:top-0 before:z-[8] before:w-full before:content-[""] dark:bg-darkBackground ${
    isOpen ? 'left-0' : '-left-full'
  }`;
