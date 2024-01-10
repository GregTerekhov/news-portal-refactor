import React, { FC } from 'react';

import { PrimaryButton, ThemeSwitcher, VerifiableInput } from 'ui';

import { useForgotPassword } from '../hooks';
import { VariantSwitcher } from 'ui/ThemeSwitcher/ThemeSwitcher';
import { VariantVerifiableInputs } from 'ui/VerifiableInput/VerifiableInput';
import { VariantButton } from 'ui/PrimaryButton/PrimaryButton';

const ChangePassword: FC = () => {
  const {
    changePasswordInputs,
    handleChangePasswordSubmit,
    changePasswordSubmitHandler,
    registerChangePassword,
  } = useForgotPassword();

  return (
    <>
      <h2 className='text-2xl text-darkBase dark:text-whiteBase py-4 border-solid border-fullDark/[.2] border-b-[1px] dark:border-whiteBase/[.2] transition-colors duration-500'>
        Change your password
      </h2>
      <form className='pt-4' onSubmit={handleChangePasswordSubmit(changePasswordSubmitHandler)}>
        <ul className='space-y-4 lg:space-y-8 mb-8'>
          {Array.isArray(changePasswordInputs) &&
            changePasswordInputs.map(
              ({ type, placeholder, children, errors, label, ariaInvalid }) => (
                <li key={label}>
                  <VerifiableInput
                    inputData={{
                      type,
                      placeholder,
                      children,
                    }}
                    errors={errors}
                    register={registerChangePassword}
                    label={label}
                    svgName='icon-password'
                    hasIcon={false}
                    variant={VariantVerifiableInputs.Auth}
                    ariaInvalid={ariaInvalid}
                  />
                </li>
              ),
            )}
        </ul>

        <div className='flex justify-between items-center'>
          <PrimaryButton
            buttonData={{ type: 'submit' }}
            id='Login button'
            variant={VariantButton.Other}
            classNameButton='w-32'
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
