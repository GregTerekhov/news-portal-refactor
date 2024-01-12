import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { useNotification } from 'contexts';
import { useToast } from 'hooks';

import { LinkedAccounts } from 'components';

import { UpdateEmail, UpdatePassword } from './subcomponents';
import { Notification } from 'ui';

const AccountManagePage: FC<{}> = () => {
  const { authError, statusMessage } = useAuthRedux();
  const { openToast, setOpenToast } = useNotification();
  const { showErrorToast } = useToast();

  console.log('statusMessage', statusMessage);

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
      <Notification
        openToast={openToast}
        setOpenToast={setOpenToast}
        title={authError && authError.message ? 'Authorisation error' : 'Update credentials'}
        description={authError && authError.message ? showErrorToast() : statusMessage}
      />
    </div>
  );
};

export default AccountManagePage;
