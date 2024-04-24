import React, { FC } from 'react';

import { VariantButton, VariantSwitcher, VariantVerifiableInputs } from 'types';

import { PrimaryButton, ThemeSwitcher, VerifiableInput } from 'ui';

import { useChangePassword } from '../hooks';

const ChangePassword: FC = () => {
  const {
    changePasswordInputs,
    handleChangePasswordSubmit,
    changePasswordSubmitHandler,
    registerChangePassword,
  } = useChangePassword();

  return (
    <>
      <h2 className='mb-4 border-b-[1px] border-solid border-fullDark/[.2] py-4 text-2xl text-darkBase transition-colors duration-500 dark:border-whiteBase/[.2] dark:text-whiteBase hg:text-3xl'>
        Change your password
      </h2>
      <form onSubmit={handleChangePasswordSubmit(changePasswordSubmitHandler)}>
        <ul className='mb-8 space-y-4 lg:space-y-8'>
          {Array.isArray(changePasswordInputs) &&
            changePasswordInputs.map(
              ({ type, placeholder, labelName, autoFocus, errors, label, ariaInvalid }) => (
                <li key={label}>
                  <VerifiableInput
                    inputData={{
                      type,
                      placeholder,
                      labelName,
                      autoFocus,
                    }}
                    errors={errors}
                    register={registerChangePassword}
                    label={label}
                    variant={VariantVerifiableInputs.Auth}
                    ariaInvalid={ariaInvalid}
                  />
                </li>
              ),
            )}
        </ul>
        <div className='flex items-center justify-between'>
          <PrimaryButton
            type='submit'
            id='Change password and login'
            variant={VariantButton.Other}
            width='w-32'
          >
            Change
          </PrimaryButton>
          <ThemeSwitcher variant={VariantSwitcher.Modal} />
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
