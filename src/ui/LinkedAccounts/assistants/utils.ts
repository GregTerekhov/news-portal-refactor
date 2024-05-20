import { IconSizes } from 'types';

export const getButtonWrapperClass = (
  isManageAccountPage: boolean,
  isMobile: boolean,
  isTV: boolean,
): string => {
  switch (true) {
    case isManageAccountPage || isMobile:
      return 'w-14';
    case isTV:
      return 'w-36';

    default:
      return 'w-32';
  }
};

export const getSvgSize = (
  isManageAccountPage: boolean,
  isMobile: boolean,
  isTV: boolean,
): IconSizes => {
  switch (true) {
    case isMobile:
      return IconSizes.smIcon20;
    case isTV && isManageAccountPage:
      return IconSizes.mdIcon27;

    default:
      return IconSizes.mdIcon24;
  }
};

export const getAriaLabel = (
  account: string,
  isManageAccountPage: boolean,
  hasAccount: boolean,
): string => {
  switch (true) {
    case isManageAccountPage && hasAccount:
      return `${account} account unbinding`;
    case isManageAccountPage && !hasAccount:
      return `${account} account binding`;

    default:
      return `Enter with ${account}`;
  }
};

export const getCallToActionText = (hasAccount: boolean, account: string): string => {
  return hasAccount
    ? `Disconnect your ${account} account from News. You will no longer be able to use it to log in.`
    : `Connect your ${account} account to login to News.`;
};

export const getButtonStyles = (isManageAccountPage: boolean): string => {
  return `w-14 h-14 rounded-xl border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent group hocus:border-accentBase hocus:text-accentBase dark:hocus:text-whiteBase dark:hocus:border-whiteBase hocus:bg-whiteBase dark:hocus:bg-accentBase ring-whiteBase dark:ring-darkBase ring-2 ${
    isManageAccountPage ? 'lg:w-12 lg:h-12 hg:w-16 hg:h-16' : 'md:w-full'
  }`;
};
