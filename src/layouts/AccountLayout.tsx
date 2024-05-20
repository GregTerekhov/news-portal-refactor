import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { IconName, IconSizes, NavId } from 'types';

import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';
import { CommonMenu } from './subcomponents';

const AccountLayout: FC = () => {
  const { isNotMobile } = useWindowWidthContext();

  return (
    <div className='flex justify-between gap-2'>
      <div className='md:space-y-6'>
        <SvgIcon
          svgName={IconName.Logo}
          sizeKey={isNotMobile ? IconSizes.ultraIcon195 : IconSizes.xlIcon80}
          className='fill-darkBase dark:fill-whiteBase'
        />
        {isNotMobile ? <CommonMenu navId={NavId.Account} /> : null}
      </div>
      <Outlet />
    </div>
  );
};

export default AccountLayout;
