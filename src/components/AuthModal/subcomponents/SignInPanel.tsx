import React, { FC } from 'react';

import { VariantButton, VariantInputs, VariantSwitcher, VariantVerifiableInputs } from 'types';

import { PrimaryButton, ThemeSwitcher, UnverifiableInput, VerifiableInput } from 'ui';

import ThirdPartyAuthPanel from './ThirdPartyAuthPanel';
import ForgotPassword from './ForgotPassword';

import { useSignIn } from '../hooks';

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

  return (
    <>
      <form className='mb-6 space-y-4 md:space-y-6' onSubmit={handleSubmit(signInSubmitHandler)}>
        <ul className='flex flex-col gap-y-3.5'>
          {Array.isArray(signInInputs) &&
            signInInputs.map(
              ({
                type,
                placeholder,
                children,
                autoFocus,
                fieldValue,
                errors,
                label,
                ariaInvalid,
              }) => (
                <li key={label}>
                  <VerifiableInput
                    inputData={{ type, placeholder, autoFocus, children, fieldValue }}
                    errors={errors}
                    register={registration}
                    label={label}
                    hasIcon={false}
                    variant={VariantVerifiableInputs.Auth}
                    ariaInvalid={ariaInvalid}
                  />
                </li>
              ),
            )}
        </ul>
        <ForgotPassword
          handleShowRecoveryInput={handleShowRecoveryInput}
          isShowRecoveryInput={isShowRecoveryInput}
        />
        <UnverifiableInput
          inputData={{
            name: 'checkbox',
            type: 'checkbox',
            children: 'Remember me',
          }}
          isChecked={isChecked}
          hasIcon={false}
          variant={VariantInputs.Checkbox}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event)}
        />
        <div className='flex items-center justify-between'>
          <PrimaryButton
            type='submit'
            id='Login button'
            variant={VariantButton.Other}
            classNameButton='w-32'
          >
            Sign In
          </PrimaryButton>
          <ThemeSwitcher variant={VariantSwitcher.Modal} />
        </div>
      </form>
      <ThirdPartyAuthPanel />
    </>
  );
};

export default SignInPanel;
