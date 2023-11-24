import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { useWindowWidth } from 'hooks';

import { AccountMenu } from 'components';
import { SvgIcon } from 'ui';

const AccountLayout: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  return (
    <>
      <div className='flex justify-between gap-2 md:justify-around'>
        <div className='md:space-y-6'>
          <SvgIcon
            svgName='icon-logo'
            size={breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? 195 : 80}
            className='fill-darkBase dark:fill-whiteBase'
          />
          {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
            <AccountMenu />
          ) : null}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default AccountLayout;
