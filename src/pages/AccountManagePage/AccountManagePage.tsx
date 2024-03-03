import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { LinkedAccounts, Toast } from 'components';

import { UpdateEmail, UpdatePassword } from './subcomponents';

const AccountManagePage: FC<{}> = () => {
  const { authError, statusMessage } = useAuthRedux();

  const showUpdatedToast =
    statusMessage === 'Email is successfully updated' ||
    statusMessage === 'Password is successfully updated';
  const showErrorToast = authError && authError;

  return (
    <div>
      <h2 className='mb-14 text-end text-3xl leading-tighter text-darkBase dark:text-whiteBase hg:text-5xl'>
        Account settings
      </h2>
      <div className='flex items-center justify-end'>
        <div className='w-52 space-y-2 md:w-80 md:space-y-6 lg:w-600px'>
          <UpdateEmail />
          <UpdatePassword />
          <LinkedAccounts />
        </div>
      </div>
      {showErrorToast ? <Toast variant='interactive' status='error' /> : null}
      {showUpdatedToast ? <Toast variant='interactive' status='success' /> : null}
    </div>
  );
};

export default AccountManagePage;
