import React, { FC } from 'react';

import { ThemeSwitcher } from 'components';
import { PrimaryButton, VerifiableInput } from 'ui';

import { useAuth } from '../hooks';

const ChangePassword: FC = () => {
  const {
    changeInputs,
    handleChangePasswordSubmit,
    changePasswordSubmitHandler,
    registerChangePassword,
  } = useAuth();

  return (
    <>
      <h2 className='text-2xl text-darkBase dark:text-whiteBase py-4 border-solid border-fullDark/[.2] border-b-[1px] dark:border-whiteBase/[.2] transition-colors duration-500'>
        Change your password
      </h2>
      <form className='pt-4' onSubmit={handleChangePasswordSubmit(changePasswordSubmitHandler)}>
        <ul className='space-y-4 lg:space-y-8 mb-8'>
          {Array.isArray(changeInputs) &&
            changeInputs.map(({ type, placeholder, children, errors, label, ariaInvalid }) => (
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
                  variant='auth'
                  ariaInvalid={ariaInvalid}
                />
              </li>
            ))}
        </ul>

        <div className='flex justify-between items-center'>
          <PrimaryButton
            buttonData={{ type: 'submit' }}
            id='Login button'
            variant='OtherButton'
            classNameButton='w-32'
          >
            Change
          </PrimaryButton>
          <ThemeSwitcher variant='modal' />
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
