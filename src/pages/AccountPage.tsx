import React, { FC } from 'react';

import { useAuthCollector, useWindowWidth } from 'hooks';

import { SvgIcon } from 'ui';

const AccountPage: FC<{}> = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { user } = useAuthCollector();

  return (
    <div>
      <p className='text-darkBase dark:text-whiteBase text-3xl leading-tighter text-end mb-14'>
        Your account
      </p>
      <div className='flex items-center justify-end mb-6 md:mb-10'>
        <div className='space-y-6 md:space-y-10 w-52 md:w-80'>
          <div>
            <h3 className='text-darkBase dark:text-whiteBase mb-2 text-end md:text-2xl'>
              Account ID:
            </h3>
            <p className='text-accentBase dark:text-greyAlt text-end md:text-medium'>
              3453451236246{user.id}
            </p>
          </div>
          <div>
            <h3 className='text-darkBase dark:text-whiteBase mb-2 text-end md:text-2xl'>
              Your name:
            </h3>
            <p className='text-accentBase dark:text-greyAlt text-end md:text-medium'>
              {user.name} Example Name
            </p>
          </div>
          <div>
            <h3 className='text-darkBase dark:text-whiteBase mb-2 text-end md:text-2xl'>
              Your email:
            </h3>
            <p className='text-accentBase dark:text-greyAlt text-end md:text-medium'>
              {user.email} example@mail.com
            </p>
          </div>
          <div>
            <h3 className='text-darkBase dark:text-whiteBase mb-4 md:text-2xl text-end'>
              Connected accounts
            </h3>
            <div className='flex items-center justify-end gap-x-4 md:gap-x-6'>
              <div className='border border-solid rounded-[10px] bg-accentBase dark:border-whiteBase p-2'>
                <SvgIcon
                  svgName='icon-google'
                  size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                  className='fill-whiteBase'
                />
              </div>
              <div className='border border-solid rounded-[10px] bg-accentBase dark:border-whiteBase p-2'>
                <SvgIcon
                  svgName='icon-facebook'
                  size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                  className='fill-whiteBase'
                />
              </div>
              <div className='border border-solid rounded-[10px] bg-accentBase dark:border-whiteBase p-2'>
                <SvgIcon
                  svgName='icon-apple'
                  size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                  className='fill-whiteBase'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
