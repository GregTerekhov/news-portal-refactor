import React, { FC } from 'react';

import {
  ButtonType,
  InputLabel,
  InputType,
  VariantsPlaceholder,
  VariantVerifiableInputs,
} from 'types';

import { VerifiableInput } from 'ui';

import { useSendEmail } from '../hooks';

interface IForgotPasswordProps {
  handleShowRecoveryInput: () => void;
  showRecoveryInput: boolean;
}

const ForgotPassword: FC<IForgotPasswordProps> = ({
  handleShowRecoveryInput,
  showRecoveryInput,
}) => {
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
        type={ButtonType.Button}
        className={`py-2 text-medium text-darkBase dark:text-whiteBase ${
          showRecoveryInput ? 'mb-3' : 'mb-0'
        }`}
        onClick={handleShowRecoveryInput}
      >
        Forgot password?
      </button>
      {showRecoveryInput ? (
        <VerifiableInput
          inputData={{
            type: InputType.Email,
            placeholder: VariantsPlaceholder.RecoveryPassword,
            autoFocus: true,
            autofill: 'email',
          }}
          errors={recoveryPasswordErrors?.email?.message}
          register={registerRecovery}
          handleSubmitRecovery={handleRecoveryPasswordSubmit(recoveryPasswordSubmitHandler)}
          label={InputLabel.Email}
          variant={VariantVerifiableInputs.Auth}
          ariaInvalid={recoveryPasswordErrors?.email ? 'true' : 'false'}
        />
      ) : null}
    </div>
  );
};

export default ForgotPassword;
