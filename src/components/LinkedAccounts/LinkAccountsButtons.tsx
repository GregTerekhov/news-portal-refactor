import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotification, useWindowWidth } from 'contexts';

import { VariantButton } from 'types';
import { useActiveLinks } from 'hooks';

import { PrimaryButton } from 'ui';

import { useGoogleSettings } from './hooks';

type AccountsButton = {
  svgName: string;
  account: string;
  hasAccount: boolean;
  onClick: (() => Promise<void>) | (() => void);
};

const LinkAccountsButtons: FC = () => {
  const { haveAccounts, unbindGoogle } = useAuthRedux();

  const { isMobile, isTV } = useWindowWidth();
  const { showToast } = useNotification();

  const { isManageAccountPage } = useActiveLinks();
  const { googleLogin } = useGoogleSettings();

  const handleGoogleLinkClick = async () => {
    if (haveAccounts.google) {
      const response = await unbindGoogle();

      showToast(response.meta.requestStatus);
    } else {
      googleLogin();
    }
  };

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
        // handleFacebookLogin();
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

  const accountButtonStyles = `w-14 h-14 ${
    isManageAccountPage ? 'lg:w-12 lg:h-12 hg:w-16 hg:h-16' : 'md:w-full'
  } rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hocus:border-accentBase hocus:text-accentBase dark:hocus:text-whiteBase dark:hocus:border-whiteBase hocus:bg-whiteBase dark:hocus:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2`;

  return (
    <ul
      className={`${
        isManageAccountPage ? 'space-y-3 md:space-y-4' : 'flex justify-evenly gap-4 md:gap-8'
      }`}
    >
      {accountButtons.map(({ svgName, account, onClick, hasAccount }) => (
        <li
          key={account}
          className={`${isManageAccountPage ? 'flex items-center gap-3 lg:gap-6' : ''}`}
        >
          <div
            className={`${isManageAccountPage ? 'w-14' : isMobile ? 'w-14' : isTV ? 'w-36' : 'w-32'}`}
          >
            <PrimaryButton
              variant={
                isManageAccountPage
                  ? VariantButton.Small
                  : isMobile
                    ? VariantButton.Small
                    : VariantButton.Other
              }
              hasIcon={true}
              svgName={svgName}
              svgSize={
                isMobile ? 'smIcon20' : isTV && isManageAccountPage ? 'mdIcon27' : 'mdIcon24'
              }
              ariaLabel={`${
                isManageAccountPage ? account + 'account binding' : 'Enter with' + account
              } `}
              classNameButton={`${accountButtonStyles}`}
              classNameIcon='fill-whiteBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:group-focus:fill-whiteBase dark:group-hover:fill-whiteBase'
              children={!isMobile && !isManageAccountPage ? account : ''}
              onHandleClick={onClick}
            />
          </div>
          {isManageAccountPage ? (
            <p className='text-small leading-normal text-darkBase dark:text-whiteBase lg:text-medium hg:text-xl'>
              {`${
                hasAccount
                  ? `Disconnect your ${account} account from News. You will no longer be able to use it to log in.`
                  : `Connect your ${account} account to login to News.`
              }`}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default LinkAccountsButtons;
