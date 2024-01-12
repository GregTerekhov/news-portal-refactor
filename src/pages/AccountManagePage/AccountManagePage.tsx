import React, { FC, useEffect, useState } from 'react';

import { LinkedAccounts } from 'components';

import { UpdateEmail, UpdatePassword } from './subcomponents';
import { useAppSelector } from 'reduxStore/hooks';
import { selectAnyDataChange } from 'reduxStore/auth';
import Notification from 'ui/Notification';

const AccountManagePage: FC<{}> = () => {
  const userSel = useAppSelector(selectAnyDataChange);

  const [openDataChangeToast, setOpenDataChangeToast] = useState<boolean>(false);

  useEffect(() => {
    if (userSel.code === 200) {
      setOpenDataChangeToast(true);
    }
  }, [userSel]);

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
        variant='interactive'
        openToast={openDataChangeToast}
        setOpenToast={setOpenDataChangeToast}
        title='User data changed'
        description={`${userSel.message}`}
      />
    </div>
  );
};

export default AccountManagePage;
