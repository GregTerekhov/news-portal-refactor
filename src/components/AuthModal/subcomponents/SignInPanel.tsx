import React, { FC } from 'react';

import { PrimaryButton, ThemeSwitcher, UnverifiableInput, VerifiableInput } from 'ui';
import LinkedAccounts from '../../LinkedAccounts/LinkedAccounts';

import { useForgotPassword, useSignIn } from '../hooks';

interface SignInProps {
  handleShowRecoveryInput: () => void;
  isShowRecoveryInput: boolean;
}

const SignInPanel: FC<SignInProps> = ({ handleShowRecoveryInput, isShowRecoveryInput }) => {
  const {
    handleSubmit,
    registration,
    handleCheckboxChange,
    signInSubmitHandler,
    signInInputs,
    isChecked,
  } = useSignIn();
  const {
    recoveryPasswordErrors,
    registerRecovery,
    handleRecoveryPasswordSubmit,
    recoveryPasswordSubmitHandler,
  } = useForgotPassword();

  return (
    <>
      <form className='space-y-4 md:space-y-6 mb-6' onSubmit={handleSubmit(signInSubmitHandler)}>
        <ul className='flex flex-col gap-y-3.5'>
          {Array.isArray(signInInputs) &&
            signInInputs.map(
              ({ type, placeholder, children, fieldValue, errors, label, ariaInvalid }) => (
                <li key={label}>
                  <VerifiableInput
                    inputData={{ type, placeholder, children, fieldValue }}
                    errors={errors}
                    register={registration}
                    label={label}
                    hasIcon={false}
                    variant='auth'
                    ariaInvalid={ariaInvalid}
                  />
                </li>
              ),
            )}
        </ul>
        <div className='text-center'>
          <button
            id='Show password recovery input'
            type='button'
            className={`text-medium text-darkBase dark:text-whiteBase py-2 ${
              isShowRecoveryInput && 'mb-3'
            }`}
            onClick={handleShowRecoveryInput}
          >
            Forgot password?
          </button>
          {isShowRecoveryInput ? (
            <VerifiableInput
              inputData={{
                type: 'email',
                placeholder: 'Enter your email',
              }}
              errors={recoveryPasswordErrors?.email?.message}
              register={registerRecovery}
              handleSubmitRecovery={handleRecoveryPasswordSubmit(recoveryPasswordSubmitHandler)}
              label='recoveryEmail'
              hasIcon={false}
              variant='auth'
              ariaInvalid={recoveryPasswordErrors?.email ? 'true' : 'false'}
            />
          ) : null}
        </div>
        <UnverifiableInput
          inputData={{
            name: 'checkbox',
            type: 'checkbox',
            children: 'Remember me',
          }}
          isChecked={isChecked}
          hasIcon={false}
          variant='checkbox'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event)}
        />
        <div className='flex justify-between items-center'>
          <PrimaryButton
            buttonData={{ type: 'submit' }}
            id='Login button'
            variant='OtherButton'
            classNameButton='w-32'
          >
            Sign In
          </PrimaryButton>
          <ThemeSwitcher variant='modal' />
        </div>
      </form>
      <div className='relative z-20 flex items-center justify-center mb-6'>
        <span className='relative px-2 z-30 border border-solid border-greyAlt/[.4] rounded-xl text-small text-greyAlt dark:text-whiteBase/[.8] bg-whiteBase/[.9] dark:bg-darkBackground transition-colors duration-500'>
          or Sign in with
        </span>
        <hr className='absolute top-1/2 left-0 w-full h-px bg-greyAlt dark:bg-whiteBase/[.1] opacity-60 dark:opacity-20' />
      </div>
      <LinkedAccounts />
    </>
  );
};

export default SignInPanel;
