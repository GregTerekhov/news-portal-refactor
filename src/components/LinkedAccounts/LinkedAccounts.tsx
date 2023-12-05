import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import { useActiveLinks, useWindowWidth } from 'hooks';

import { PrimaryButton } from 'ui';

const LinkedAccounts: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log('codeResponse', codeResponse),
    // flow: 'auth-code',
  });

  const hasConnectedAccount = false;
  const isMobile = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;

  const accountButtons = [
    {
      svgName: 'icon-google',
      account: 'Google',
      dataTooltipTarget: 'tooltip-Google',
      onClick: () => {
        login();
      },
    },
    {
      svgName: 'icon-facebook',
      account: 'Facebook',
      dataTooltipTarget: 'tooltip-Facebook',
      onClick: () => console.log('facebook'),
    },
    {
      svgName: 'icon-apple',
      account: 'Apple',
      dataTooltipTarget: 'tooltip-Apple',
      onClick: () => console.log('apple'),
    },
  ];

  return (
    <>
      {activeLinks.isManageAccountPage ? (
        <>
          <h3 className='text-darkBase dark:text-whiteBase mb-2 lg:mb-4 md:text-2xl'>
            Connected accounts
          </h3>
          <p className='text-darkBase text-small lg:text-medium leading-normal dark:text-whiteBase after:content=[""] after:block after:mt-3 after:w-full after:h-px after:bg-greyAlt after:dark:bg-whiteBase mb-2 md:mb-4'>
            Connect your News account to Google, Facebook, or Apple to log in using this account. We
            will never send messages to your contacts without your permission.
          </p>
        </>
      ) : null}
      <menu
        className={`${
          activeLinks.isManageAccountPage
            ? 'space-y-3 md:space-y-4'
            : 'flex justify-around md:gap-8'
        }`}
      >
        {accountButtons.map(({ svgName, account, onClick }) => (
          <li
            key={svgName}
            className={`${
              activeLinks.isManageAccountPage ? 'flex items-center gap-3 lg:gap-6' : ''
            }`}
          >
            <div
              className={`${activeLinks.isManageAccountPage ? 'w-10' : isMobile ? 'w-10' : 'w-32'}`}
            >
              <PrimaryButton
                variant={`${
                  activeLinks.isManageAccountPage ? 'Small' : isMobile ? 'Small' : 'OtherButton'
                }`}
                hasIcon={true}
                svgName={svgName}
                width='w-full'
                svgSize={isMobile ? 20 : 24}
                ariaLabel={`${account} account binding`}
                classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
                classNameIcon='fill-whiteBase'
                children={!isMobile && !activeLinks.isManageAccountPage ? account : ''}
                onHandleClick={onClick}
              />
            </div>
            {activeLinks.isManageAccountPage ? (
              <p className='text-darkBase text-small lg:text-medium dark:text-whiteBase leading-normal'>
                {`${
                  hasConnectedAccount
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
