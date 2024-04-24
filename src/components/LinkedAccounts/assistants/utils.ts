import { IconSizes } from 'constants/iconSizes';

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
): keyof IconSizes => {
  switch (true) {
    case isMobile:
      return 'smIcon20';
    case isTV && isManageAccountPage:
      return 'mdIcon27';

    default:
      return 'mdIcon24';
  }
};

export const getAriaLabel = (
  account: string,
  isManageAccountPage: boolean,
  hasAccount: boolean,
): string => {
  switch (true) {
    case isManageAccountPage && hasAccount:
      return account + ' account unbinding';
    case isManageAccountPage && !hasAccount:
      return account + ' account binding';

    default:
      return 'Enter with ' + account;
  }
};

export const getCallToActionText = (hasAccount: boolean, account: string): string => {
  return hasAccount
    ? `Disconnect your ${account.toLowerCase()} account from News. You will no longer be able to use it to log in.`
    : `Connect your ${account.toLowerCase()} account to login to News.`;
};
