import { IconName, type HaveAccounts } from 'types';

type AccountsButton = {
  svgName: IconName;
  account: string;
  hasAccount: boolean;
  onClick: (() => Promise<void>) | (() => void);
};

export const getButtonsData = (
  haveAccounts: HaveAccounts,
  handleGoogleLinkClick: () => Promise<void>,
  redirectOnDevelopmentPage: () => void,
): AccountsButton[] => {
  const accountButtons: AccountsButton[] = [
    {
      svgName: IconName.Google,
      account: 'Google',
      hasAccount: haveAccounts.google,
      onClick: handleGoogleLinkClick,
    },
    {
      svgName: IconName.Facebook,
      account: 'Facebook',
      hasAccount: haveAccounts.facebook,
      onClick: redirectOnDevelopmentPage,
    },
    {
      svgName: IconName.Apple,
      account: 'Apple',
      hasAccount: haveAccounts.apple,
      onClick: redirectOnDevelopmentPage,
    },
  ];

  return accountButtons;
};
