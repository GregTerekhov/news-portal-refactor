import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';

import { SvgIcon } from 'ui';

import CommonMenu from './CommonMenu/CommonMenu';

const AccountLayout: FC = () => {
  const { isNotMobile } = useWindowWidth();

  return (
    <>
      <div className='flex justify-between gap-2'>
        <div className='md:space-y-6'>
          <SvgIcon
            svgName='logo'
            size={isNotMobile ? ICON_SIZES.ultraIcon195 : ICON_SIZES.xlIcon80}
            className='fill-darkBase dark:fill-whiteBase'
          />
          {isNotMobile ? <CommonMenu navId='account-navigation' /> : null}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default AccountLayout;
