import React, { FC } from 'react';

import { VariantButton, VariantInputs, VariantSwitcher, VariantVerifiableInputs } from 'types';

import { PrimaryButton, ThemeSwitcher, UnverifiableInput, VerifiableInput } from 'ui';

import ForgotPassword from './ForgotPassword';
import ThirdPartyAuthPanel from './ThirdPartyAuthPanel';

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
                labelName,
                autoFocus,
                fieldValue,
                errors,
                label,
                ariaInvalid,
                disabled,
              }) => (
                <li key={label}>
                  <VerifiableInput
                    inputData={{
                      type,
                      placeholder,
                      autoFocus,
                      labelName,
                      fieldValue,
                      disabled,
                    }}
                    errors={errors}
                    register={registration}
                    label={label}
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
        <div className='flex flex-row-reverse gap-x-3'>
          <UnverifiableInput
            inputData={{
              name: 'checkbox',
              type: 'checkbox',
            }}
            isChecked={isChecked}
            hasIcon={false}
            variant={VariantInputs.Checkbox}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <PrimaryButton type='submit' id='Login button' variant={VariantButton.Other} width='w-32'>
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
