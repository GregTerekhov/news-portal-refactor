import React, { FC } from 'react';

import { UpdateCredentialsInput, VariantButton, VariantVerifiableInputs } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';

import { Accordeon, PrimaryButton, VerifiableInput } from 'ui';

import { useUpdateEmail, useUpdatePassword } from '../hooks';

interface UpdateCredentialsProps {
  field: string;
}

const UpdateCredentials: FC<UpdateCredentialsProps> = ({ field }) => {
  const { isRefreshingUser } = useAuthRedux();
  const { emailSubmit, updateEmailRegister, emailInputs, handleEmailSubmitHandler } =
    useUpdateEmail();
  const { passwordSubmit, updatePasswordRegister, handlePasswordSubmitHandler, passwordInputs } =
    useUpdatePassword();

  const credentialInputs: UpdateCredentialsInput[] =
    field === 'email' ? emailInputs : passwordInputs;

  const updateEmailDescription = `and confirm by inputting your current ${field} in the new field.`;
  const updatePasswordDescription = `in the first field and repeat the entry in the second field. In the third field, confirm the change by inputting your current ${field}.`;

  const descriptionText = field === 'email' ? updateEmailDescription : updatePasswordDescription;

  return (
    <Accordeon position='accountManagePage' filtersBlock={`Change your ${field}`}>
      <form
        className='space-y-4 pt-4 lg:space-y-8'
        onSubmit={
          field === 'email'
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
                    register={field === 'email' ? updateEmailRegister : updatePasswordRegister}
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
          type='submit'
          width='w-28 lg:w-40'
          id={`Button for applying change ${field === 'password' ? 'and confirm ' : ''}your new ${field}`}
          variant={VariantButton.Other}
          disabled={field === 'email' && isRefreshingUser ? true : false}
        >
          Apply
        </PrimaryButton>
      </form>
    </Accordeon>
  );
};

export default UpdateCredentials;
