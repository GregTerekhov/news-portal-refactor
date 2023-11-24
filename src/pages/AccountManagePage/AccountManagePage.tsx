import React, { FC } from 'react';

import { LinkedAccounts } from 'components';

import { UpdateEmail, UpdatePassword } from './subcomponents';

const AccountManagePage: FC<{}> = () => {
  return (
    <div>
      <h2 className='text-darkBase dark:text-whiteBase text-3xl leading-tighter text-end mb-14'>
        Account settings
      </h2>
      <div className='flex items-center justify-end'>
        <div className='space-y-2 md:space-y-6 w-52 md:w-80 lg:w-[600px]'>
          <UpdateEmail />
          <UpdatePassword />
          <LinkedAccounts />
        </div>
      </div>
    </div>
  );
};

export default AccountManagePage;
