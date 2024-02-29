import React, { FC } from 'react';

import { VariantVerifiableInputs } from 'types';

import { VerifiableInput } from 'ui';

import { useSendEmail } from '../hooks';

interface SignInProps {
  handleShowRecoveryInput: () => void;
  isShowRecoveryInput: boolean;
}

const ForgotPassword: FC<SignInProps> = ({ handleShowRecoveryInput, isShowRecoveryInput }) => {
  const {
    recoveryPasswordErrors,
    registerRecovery,
    handleRecoveryPasswordSubmit,
    recoveryPasswordSubmitHandler,
  } = useSendEmail();

  return (
    <div className='text-center'>
      <button
        id='Show password recovery input'
        type='button'
        className={`py-2 text-medium text-darkBase dark:text-whiteBase ${
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
            placeholder: 'Enter your current email',
            autoFocus: true,
            autofill: 'email',
          }}
          errors={recoveryPasswordErrors?.email?.message}
          register={registerRecovery}
          handleSubmitRecovery={handleRecoveryPasswordSubmit(recoveryPasswordSubmitHandler)}
          label='email'
          hasIcon={false}
          variant={VariantVerifiableInputs.Auth}
          ariaInvalid={recoveryPasswordErrors?.email ? 'true' : 'false'}
        />
      ) : null}
    </div>
  );
};

export default ForgotPassword;
