import React, { FC } from 'react';

import {
  ButtonType,
  InputLabel,
  PrimaryButtonId,
  VariantButton,
  VariantsAccordion,
  VariantVerifiableInputs,
  type UpdateCredentialsInput,
} from 'types';

import { useAuthRedux } from 'reduxStore/hooks';

import { Accordeon, PrimaryButton, VerifiableInput } from 'ui';

import { useUpdateEmail, useUpdatePassword } from '../hooks';
import { getButtonDisabledState, getDescriptionText } from '../assistants';

interface IUpdateCredentialsProps {
  field: InputLabel;
}

const UpdateCredentials: FC<IUpdateCredentialsProps> = ({ field }) => {
  const { isRefreshingUser } = useAuthRedux();

  const { emailSubmit, updateEmailRegister, emailInputs, handleEmailSubmitHandler } =
    useUpdateEmail();
  const { passwordSubmit, updatePasswordRegister, handlePasswordSubmitHandler, passwordInputs } =
    useUpdatePassword();

  const credentialInputs: UpdateCredentialsInput[] =
    field === InputLabel.Email ? emailInputs : passwordInputs;

  const descriptionText = getDescriptionText(field);
  const disabled = getButtonDisabledState(field, isRefreshingUser);

  return (
    <Accordeon
      position={VariantsAccordion.AccountSettings}
      blockDefinition={`Change your ${field}`}
    >
      <form
        className='space-y-4 pt-4 lg:space-y-8'
        onSubmit={
          field === InputLabel.Email
            ? emailSubmit(handleEmailSubmitHandler)
            : passwordSubmit(handlePasswordSubmitHandler)
        }
      >
        <ul className='space-y-4 lg:space-y-8'>
          {Array.isArray(credentialInputs) &&
            credentialInputs.map(
              ({ label, type, placeholder, fieldValue, errors, iconName, ariaInvalid }) => (
                <li key={label}>
                  <VerifiableInput
                    inputData={{
                      type,
                      placeholder,
                      fieldValue,
                    }}
                    errors={errors}
                    register={
                      field === InputLabel.Email ? updateEmailRegister : updatePasswordRegister
                    }
                    label={label}
                    hasIcon={true}
                    svgName={iconName}
                    variant={VariantVerifiableInputs.Account}
                    ariaInvalid={ariaInvalid}
                  />
                </li>
              ),
            )}
        </ul>
        <p className='text-small text-darkBase dark:text-whiteBase lg:text-medium hg:text-xl'>
          {`To change your current ${field}, enter the new ${field} ${descriptionText} If all information is entered correctly, you will receive a
          notification confirming the successful update of your ${field}.`}
        </p>
        <PrimaryButton
          type={ButtonType.Submit}
          width='w-28 lg:w-40'
          id={InputLabel.Password ? PrimaryButtonId.UpdatePassword : PrimaryButtonId.UpdateEmail}
          variant={VariantButton.Other}
          disabled={disabled}
        >
          Apply
        </PrimaryButton>
      </form>
    </Accordeon>
  );
};

export default UpdateCredentials;
