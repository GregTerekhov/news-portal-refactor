import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';
import CommonMenu from './CommonMenu/CommonMenu';

const AccountLayout: FC = () => {
  const { isNotMobile } = useWindowWidthContext();

  return (
    <div className='flex justify-between gap-2'>
      <div className='md:space-y-6'>
        <SvgIcon
          svgName='logo'
          sizeKey={isNotMobile ? 'ultraIcon195' : 'xlIcon80'}
          className='fill-darkBase dark:fill-whiteBase'
        />
        {isNotMobile ? <CommonMenu navId='account-navigation' /> : null}
      </div>
      <Outlet />
    </div>
  );
};

export default AccountLayout;
