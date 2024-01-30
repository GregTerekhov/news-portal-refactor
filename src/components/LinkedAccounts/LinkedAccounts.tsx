import React, { FC } from 'react';
// import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import { useAuthRedux } from 'reduxStore/hooks';

import { VariantButton } from 'types';
import { useWindowWidth } from 'contexts';
import { useActiveLinks } from 'hooks';

import { PrimaryButton } from 'ui';

import { useFacebookLogin } from './hooks';

// type VerifiedGoogleEmail = {
//   email: string;
// };

const LinkedAccounts: FC<{}> = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { haveAccounts } = useAuthRedux();
  const location = useLocation();
  const { isManageAccountPage } = useActiveLinks(location);

  const { handleFacebookLogin, isLoading } = useFacebookLogin();

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log('codeResponse', codeResponse);
      // try {
      //   const userInfo: VerifiedGoogleEmail = await axios
      //     .get('https://www.googleapis.com/oauth2/v3/userinfo', {
      //       headers: { Authorization: `Bearer ${codeResponse.access_token}` },
      //     })
      //     .then((res) => res.data);
      //   console.log('userInfo', userInfo);
      //   // enterWithGoogle({ email: userInfo.email });
      // } catch (error) {
      //   console.log(error);
      //   alert('Failed to login');
      // }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const hasConnectedAccount = haveAccounts.google || haveAccounts.facebook || haveAccounts.apple;
  const isMobile = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;

  const accountButtons = [
    {
      svgName: 'icon-google',
      account: 'Google',
      onClick: () => {
        googleLogin();
      },
    },
    {
      svgName: 'icon-facebook',
      account: 'Facebook',
      onClick: () => {
        handleFacebookLogin();
      },
    },
    {
      svgName: 'icon-apple',
      account: 'Apple',
      onClick: () => console.log('apple'),
    },
  ];

  return (
    <>
      {isManageAccountPage ? (
        <>
          <h3 className='mb-2 text-darkBase dark:text-whiteBase md:text-2xl lg:mb-4'>
            Connected accounts
          </h3>
          <p className='after:content=[""] mb-2 text-small leading-normal text-darkBase after:mt-3 after:block after:h-px after:w-full after:bg-greyAlt dark:text-whiteBase after:dark:bg-whiteBase md:mb-4 lg:text-medium'>
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
        {accountButtons.map(({ svgName, account, onClick }) => (
          <li
            key={svgName}
            className={`${isManageAccountPage ? 'flex items-center gap-3 lg:gap-6' : ''}`}
          >
            <div className={`${isManageAccountPage ? 'w-14' : isMobile ? 'w-14' : 'w-32'}`}>
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
                svgSize={isMobile ? 20 : 24}
                ariaLabel={`${account} account binding`}
                classNameButton={`w-14 h-14 ${
                  isManageAccountPage ? 'lg:w-12 lg:h-12' : 'md:w-full'
                } rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase hover:text-accentBase dark:hover:text-whiteBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2`}
                classNameIcon='fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase'
                children={!isMobile && !isManageAccountPage ? account : ''}
                onHandleClick={onClick}
                disabled={account === 'Facebook' && isLoading}
              />
            </div>
            {isManageAccountPage ? (
              <p className='text-small leading-normal text-darkBase dark:text-whiteBase lg:text-medium'>
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
