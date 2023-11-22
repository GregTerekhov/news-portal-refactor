import React, { FC } from 'react';

import { useWindowWidth } from 'hooks';

import { PrimaryButton } from 'ui';

import { UpdateEmail, UpdatePassword } from './subcomponents';

const AccountManagePage: FC<{}> = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const hasConnectedAccount = false;

  return (
    <div>
      <h2 className='text-darkBase dark:text-whiteBase text-3xl leading-tighter text-end mb-14'>
        Account settings
      </h2>
      <div className='flex items-center justify-end mb-2 md:mb-10'>
        <div className='space-y-2 md:space-y-6 w-52 md:w-80 lg:w-[600px]'>
          <UpdateEmail />
          <UpdatePassword />
          <div>
            <h3 className='text-darkBase dark:text-whiteBase mb-2 lg:mb-4 md:text-2xl'>
              Connected accounts
            </h3>
            <p className='text-darkBase text-xs md:text-small lg:text-medium dark:text-whiteBase after:content=[""] after:block after:mt-3 after:w-full after:h-px after:bg-greyAlt after:dark:bg-whiteBase mb-2 md:mb-4'>
              Connect your News account to Google, Facebook, or Apple to log in using this account.
              We will never send messages to your contacts without your permission.
            </p>
            <ul className='space-y-2 md:space-y-4'>
              <li className='flex items-center gap-3 lg:gap-6'>
                <PrimaryButton
                  variant='Small'
                  hasIcon={true}
                  svgName='icon-google'
                  svgSize={
                    breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                  }
                  ariaLabel='Google account binding'
                  classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
                  classNameIcon='fill-whiteBase'
                />
                <p className='text-darkBase text-xs md:text-small lg:text-medium dark:text-whiteBase'>
                  {`${
                    hasConnectedAccount
                      ? 'Disconnect your Google account from News. You will no longer be able to use it to log in.'
                      : 'Connect your Google account to login to News.'
                  }`}
                </p>
              </li>
              <li className='flex items-center gap-3 lg:gap-6'>
                <PrimaryButton
                  variant='Small'
                  hasIcon={true}
                  svgName='icon-facebook'
                  svgSize={
                    breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                  }
                  ariaLabel='Facebook account binding'
                  classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
                  classNameIcon='fill-whiteBase'
                />
                <p className='text-darkBase text-xs md:text-small lg:text-medium dark:text-whiteBase'>
                  {`${
                    hasConnectedAccount
                      ? 'Disconnect your Facebook account from News. You will no longer be able to use it to log in.'
                      : 'Connect your Facebook account to login to News.'
                  }`}
                </p>
              </li>
              <li className='flex items-center gap-3 lg:gap-6'>
                <PrimaryButton
                  variant='Small'
                  hasIcon={true}
                  svgName='icon-apple'
                  svgSize={
                    breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                  }
                  ariaLabel='Apple account binding'
                  classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
                  classNameIcon='fill-whiteBase'
                />
                <p className='text-darkBase text-xs md:text-small lg:text-medium dark:text-whiteBase'>
                  {`${
                    hasConnectedAccount
                      ? 'Disconnect your Apple account from News. You will no longer be able to use it to log in.'
                      : 'Connect your Apple account to login to News.'
                  }`}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagePage;
