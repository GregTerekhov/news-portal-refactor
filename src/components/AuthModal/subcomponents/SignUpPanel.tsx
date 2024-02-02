import React, { FC } from 'react';

import { VariantButton, VariantSwitcher, VariantVerifiableInputs } from 'types';

import { PrimaryButton, ThemeSwitcher, VerifiableInput } from 'ui';

import { useSignUp } from '../hooks';

const SignUpPanel: FC<{}> = () => {
  const { handleSubmit, registration, signUpSubmitHandler, signUpInputs } = useSignUp();

  return (
    <form onSubmit={handleSubmit(signUpSubmitHandler)}>
      <ul className='mb-6 flex flex-col gap-4 md:gap-5 hg:mb-10'>
        {Array.isArray(signUpInputs) &&
          signUpInputs.map(({ type, placeholder, children, errors, label, ariaInvalid }) => (
            <li key={label}>
              <VerifiableInput
                inputData={{ type, placeholder, children }}
                errors={errors}
                register={registration}
                label={label}
                hasIcon={false}
                variant={VariantVerifiableInputs.Auth}
                ariaInvalid={ariaInvalid}
              />
            </li>
          ))}
      </ul>
      <div className='flex items-center justify-between'>
        <PrimaryButton
          type='submit'
          id='Registration button'
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
