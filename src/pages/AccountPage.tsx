import React from 'react';

import { useAuthCollector, useWindowWidth } from 'hooks';

import { PrimaryButton } from 'ui';

const AccountPage = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { user } = useAuthCollector();

  return (
    <div>
      <p className='text-darkBase dark:text-whiteBase text-2xl leading-tighter text-end mb-14'>
        Your account
      </p>
      <div className='flex items-center justify-end mb-6 md:mb-10'>
        <div className='space-y-6 md:space-y-10 w-52 md:w-80'>
          <div>
            <p className='text-darkBase dark:text-whiteBase mb-2 text-end md:text-2xl'>
              Account ID:
            </p>
            <p className='text-accentBase dark:text-greyAlt text-end md:text-medium'>
              3453451236246
            </p>
          </div>
          <div>
            <p className='text-darkBase dark:text-whiteBase mb-2 text-end md:text-2xl'>
              Your name:
            </p>
            <p className='text-accentBase dark:text-greyAlt text-end md:text-medium'>
              {user.name} Example Name
            </p>
          </div>
          <div>
            <p className='text-darkBase dark:text-whiteBase mb-2 text-end md:text-2xl'>
              Your email:
            </p>
            <p className='text-accentBase dark:text-greyAlt text-end md:text-medium'>
              {user.email} example@mail.com
            </p>
          </div>
          <div>
            <p className='text-darkBase dark:text-whiteBase mb-4 md:text-2xl text-end'>
              Connected accounts
            </p>
            <div className='flex items-center justify-end gap-4 md:gap-6'>
              <PrimaryButton
                variant='Small'
                hasIcon={true}
                svgName='icon-google'
                svgSize={
                  breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                }
                ariaLabel='Google account binding'
                classNameButton='bg-accentBase dark:border-whiteBase py-2'
                classNameIcon='fill-whiteBase'
              />
              <PrimaryButton
                variant='Small'
                hasIcon={true}
                svgName='icon-facebook'
                svgSize={
                  breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                }
                ariaLabel='Facebook account binding'
                classNameButton='bg-accentBase dark:border-whiteBase py-2'
                classNameIcon='fill-whiteBase'
              />
              <PrimaryButton
                variant='Small'
                hasIcon={true}
                svgName='icon-apple'
                svgSize={
                  breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                }
                ariaLabel='Apple account binding'
                classNameButton='bg-accentBase dark:border-whiteBase py-2'
                classNameIcon='fill-whiteBase'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
