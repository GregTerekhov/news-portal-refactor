import { HaveAccounts } from 'types';

type AccountsButton = {
  svgName: string;
  account: string;
  hasAccount: boolean;
  onClick: (() => Promise<void>) | (() => void);
};

export const getButtonsData = (
  haveAccounts: HaveAccounts,
  handleGoogleLinkClick: () => Promise<void>,
): AccountsButton[] => {
  const accountButtons: AccountsButton[] = [
    {
      svgName: 'google',
      account: 'Google',
      hasAccount: haveAccounts.google,
      onClick: handleGoogleLinkClick,
    },
    {
      svgName: 'facebook',
      account: 'Facebook',
      hasAccount: haveAccounts.facebook,
      onClick: () => {
        console.log('facebook');
      },
    },
    {
      svgName: 'apple',
      account: 'Apple',
      hasAccount: haveAccounts.apple,
      onClick: () => console.log('apple'),
    },
  ];

  return accountButtons;
};
