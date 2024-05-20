import React, { FC } from 'react';

import {
  ButtonType,
  PrimaryButtonId,
  VariantButton,
  VariantSwitcher,
  VariantVerifiableInputs,
} from 'types';

import { PrimaryButton, ThemeSwitcher, VerifiableInput } from 'ui';
import { Checkbox, ForgotPassword, ThirdPartyAuthPanel } from './subcomponents';

import { useSignIn } from './hooks';

interface ISignInProps {
  handleShowRecoveryInput: () => void;
  showRecoveryInput: boolean;
}

const SignInPanel: FC<ISignInProps> = ({ handleShowRecoveryInput, showRecoveryInput }) => {
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
          showRecoveryInput={showRecoveryInput}
        />
        <Checkbox isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} />
        <div className='flex items-center justify-between'>
          <PrimaryButton
            type={ButtonType.Submit}
            id={PrimaryButtonId.SignIn}
            variant={VariantButton.Other}
            width='w-32'
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
