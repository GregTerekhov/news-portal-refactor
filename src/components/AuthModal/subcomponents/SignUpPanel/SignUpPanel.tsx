import React, { FC } from 'react';

import {
  ButtonType,
  PrimaryButtonId,
  VariantButton,
  VariantSwitcher,
  VariantVerifiableInputs,
} from 'types';

import { PrimaryButton, ThemeSwitcher, VerifiableInput } from 'ui';

import { useSignUp } from './hooks';

const SignUpPanel: FC = () => {
  const { handleSubmit, registration, signUpSubmitHandler, signUpInputs } = useSignUp();

  return (
    <form onSubmit={handleSubmit(signUpSubmitHandler)}>
      <ul className='mb-6 flex flex-col gap-4 md:gap-5 hg:mb-10'>
        {Array.isArray(signUpInputs) &&
          signUpInputs.map(
            ({ type, placeholder, labelName, autoFocus, errors, label, ariaInvalid }) => (
              <li key={label}>
                <VerifiableInput
                  inputData={{ type, placeholder, labelName, autoFocus }}
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
      <div className='flex items-center justify-between'>
        <PrimaryButton
          type={ButtonType.Submit}
          id={PrimaryButtonId.SignUp}
          variant={VariantButton.Other}
          width='w-32'
        >
          Sign Up
        </PrimaryButton>
        <ThemeSwitcher variant={VariantSwitcher.Modal} />
      </div>
    </form>
  );
};

export default SignUpPanel;
