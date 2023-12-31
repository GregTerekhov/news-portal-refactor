import React, { FC } from 'react';

import { PrimaryButton, ThemeSwitcher, VerifiableInput } from 'ui';

import { useSignUp } from '../hooks';

const SignUpPanel: FC<{}> = () => {
  const { handleSubmit, registration, signUpSubmitHandler, signUpInputs } = useSignUp();

  return (
    <form onSubmit={handleSubmit(signUpSubmitHandler)}>
      <ul className='flex flex-col gap-4 md:gap-5 mb-6 hg:mb-10'>
        {Array.isArray(signUpInputs) &&
          signUpInputs.map(({ type, placeholder, children, errors, label, ariaInvalid }) => (
            <li key={label}>
              <VerifiableInput
                inputData={{ type, placeholder, children }}
                errors={errors}
                register={registration}
                label={label}
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
          id='Registration button'
          variant='OtherButton'
          width='w-32'
        >
          Sign Up
        </PrimaryButton>
        <ThemeSwitcher variant='modal' />
      </div>
    </form>
  );
};

export default SignUpPanel;
