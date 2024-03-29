import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { LinkAccountsButtons, Toast } from 'components';

import { UpdateEmail, UpdatePassword } from './subcomponents';

const AccountManagePage: FC<{}> = () => {
  const { authError, statusMessage, isThirdPartyRegister } = useAuthRedux();

  const showUpdatedToast =
    statusMessage === 'Email is successfully updated' ||
    statusMessage === 'Password is successfully updated' ||
    statusMessage.includes('linking');

  const showErrorToast = authError && typeof authError === 'string';

  const shouldShowToast = showUpdatedToast || showErrorToast;

  return (
    <div>
      <h2 className='mb-14 text-end text-3xl leading-tighter text-darkBase dark:text-whiteBase hg:text-5xl'>
        Account settings
      </h2>
      <div className='flex items-center justify-end'>
        <div className='w-52 space-y-2 md:w-80 md:space-y-6 lg:w-600px'>
          {!isThirdPartyRegister && (
            <>
              <UpdateEmail />
              <UpdatePassword />
            </>
          )}
          <h3 className='text-darkBase dark:text-whiteBase md:text-2xl lg:mb-4 hg:text-3xl'>
            Connected accounts
          </h3>
          <p className='text-small leading-normal text-darkBase dark:text-whiteBase lg:text-medium hg:text-xl'>
            You can connect or disconnect your News account to Google, Facebook, or Apple to log in
            using this account. We will never send messages to your contacts without your
            permission.
          </p>
          <hr className='!border-greyAlt dark:!border-whiteBase' />
          <LinkAccountsButtons />
        </div>
      </div>
      {shouldShowToast ? (
        <Toast variant='interactive' status={showUpdatedToast ? 'success' : 'error'} />
      ) : null}
    </div>
  );
};

export default AccountManagePage;
