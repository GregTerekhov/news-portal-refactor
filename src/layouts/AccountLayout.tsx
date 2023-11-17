import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { useWindowWidth } from 'hooks';

import { AccountMenu } from 'components';
import { Input, SvgIcon } from 'ui';

const AccountLayout: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  return (
    <>
      <div className={`flex justify-around`}>
        <div className='space-y-6'>
          <SvgIcon
            svgName='icon-logo'
            size={breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? 160 : 80}
            className='fill-darkBase dark:fill-whiteBase'
          />
          {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
            <AccountMenu />
          ) : null}
        </div>
        <Outlet />
      </div>
      <div>
        <p className='text-darkBase dark:text-whiteBase mb-4 md:text-2xl text-end'>
          Change your theme
        </p>
        <div className='flex flex-nowrap justify-center gap-5'>
          <div className='flex items-center justify-center rounded-full'>
            <Input
              inputData={{ id: 'light' }}
              variant='themeChanger'
              hasIcon={false}
              className='text-[#f4f4f4] focus:ring-[#f4f4f4] dark:focus:ring-[#f4f4f4] border-[#f4f4f4] dark:ring-offset-[#f4f4f4]'
            />
          </div>
          <div className='flex items-center justify-center rounded-full'>
            <Input
              inputData={{ id: 'dark' }}
              variant='themeChanger'
              hasIcon={false}
              className='text-[#2e2e2e] focus:ring-[#2e2e2e] dark:focus:ring-[#2e2e2e] border-[#2e2e2e]'
            />
          </div>
          <div className='flex items-center justify-center rounded-full'>
            <Input
              inputData={{ id: 'sweetPink' }}
              variant='themeChanger'
              hasIcon={false}
              className='text-[#fca5a5] focus:ring-[#fca5a5] dark:focus:ring-[#fca5a5] border-[#fca5a5]'
            />
          </div>
          {/* <div className='flex items-center justify-center rounded-full'>
            <Input
              inputData={{ id: 'macaroniAndCheese' }}
              variant='themeChanger'
              hasIcon={false}
              className='text-[#fdba74] focus:ring-[#fdba74] dark:focus:ring-[#fdba74] border-[#fdba74]'
            />
          </div> */}
          {/* <div className='flex items-center justify-center rounded-full'>
            <Input
              inputData={{ id: 'iceCold' }}
              variant='themeChanger'
              hasIcon={false}
              className='text-[#bbf7d0] focus:ring-[#bbf7d0] dark:focus:ring-[#bbf7d0] border-[#bbf7d0]'
            />
          </div> */}
          <div className='flex items-center justify-center rounded-full'>
            <Input
              inputData={{ id: 'blueChill' }}
              variant='themeChanger'
              hasIcon={false}
              className='text-[#0d9488] focus:ring-[#0d9488] dark:focus:ring-[#0d9488] border-[#0d9488]'
            />
          </div>
          {/* <div className='flex items-center justify-center rounded-full'>
            <Input
              inputData={{ id: 'lochmara' }}
              variant='themeChanger'
              hasIcon={false}
              className='text-[#0284c7] focus:ring-[#0284c7] dark:focus:ring-[#0284c7] border-[#0284c7]'
            />
          </div> */}
          <div className='flex items-center justify-center rounded-full'>
            <Input
              inputData={{ id: 'mariner' }}
              variant='themeChanger'
              hasIcon={false}
              className='text-[#2773cb] focus:ring-[#2773cb] dark:focus:ring-[#2773cb] border-[#2773cb]'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
