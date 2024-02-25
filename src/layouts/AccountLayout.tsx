import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';

import { SvgIcon } from 'ui';

import { AccountMenu } from './subcomponents';

const AccountLayout: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth();

  return (
    <>
      <div className='flex justify-between gap-2'>
        <div className='md:space-y-6'>
          <SvgIcon
            svgName='icon-logo'
            size={
              breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop
                ? ICON_SIZES.ultraIcon195
                : ICON_SIZES.xlIcon80
            }
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
