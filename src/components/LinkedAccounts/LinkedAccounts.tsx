import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { ICON_SIZES } from 'constants/iconSizes';
import { VariantButton } from 'types';
import { useWindowWidth } from 'contexts';
import { useActiveLinks } from 'hooks';

import { PrimaryButton } from 'ui';

import { useFacebookLogin, useGoogleSettings } from './hooks';

const LinkedAccounts: FC<{}> = () => {
  const { isMobile, isTV } = useWindowWidth();
  const { haveAccounts, unbindGoogle } = useAuthRedux();

  const { isManageAccountPage } = useActiveLinks();

  const { googleLogin } = useGoogleSettings();
  const { handleFacebookLogin, isLoading } = useFacebookLogin();

  // 'https://news-webapp-express.onrender.com/api/auth/google', - шлях до беку на redirect
  const accountButtons = [
    {
      svgName: 'google',
      account: 'Google',
      hasAccount: haveAccounts.google,
      onClick: () => {
        haveAccounts.google ? unbindGoogle() : googleLogin();
      },
    },
    {
      svgName: 'facebook',
      account: 'Facebook',
      hasAccount: haveAccounts.facebook,
      onClick: () => {
        handleFacebookLogin();
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
  } rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase hover:text-accentBase dark:hover:text-whiteBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2`;

  return (
    <>
      {isManageAccountPage ? (
        <>
          <h3 className='mb-2 text-darkBase dark:text-whiteBase md:text-2xl lg:mb-4 hg:text-3xl'>
            Connected accounts
          </h3>
          <p className='after:content=[""] mb-2 text-small leading-normal text-darkBase after:mt-3 after:block after:h-px after:w-full after:bg-greyAlt dark:text-whiteBase after:dark:bg-whiteBase md:mb-4 lg:text-medium hg:text-xl'>
            You can connect or disconnect your News account to Google, Facebook, or Apple to log in
            using this account. We will never send messages to your contacts without your
            permission.
          </p>
        </>
      ) : null}
      <menu
        className={`${
          isManageAccountPage ? 'space-y-3 md:space-y-4' : 'flex justify-around gap-4 md:gap-8'
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
                  isMobile
                    ? ICON_SIZES.smIcon20
                    : isTV && isManageAccountPage
                      ? ICON_SIZES.mdIcon27
                      : ICON_SIZES.mdIcon24
                }
                ariaLabel={`${
                  isManageAccountPage ? account + 'account binding' : 'Enter with' + account
                } `}
                classNameButton={`${accountButtonStyles}`}
                classNameIcon='fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase'
                children={!isMobile && !isManageAccountPage ? account : ''}
                onHandleClick={onClick}
                disabled={account === 'Facebook' && isLoading}
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
      </menu>
    </>
  );
};

export default LinkedAccounts;
