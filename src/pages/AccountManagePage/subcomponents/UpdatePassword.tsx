import React, { FC } from 'react';

import { VariantButton, VariantVerifiableInputs } from 'types';

import { Accordeon, PrimaryButton, VerifiableInput } from 'ui';

import { useUpdatePassword } from '../hooks';

const UpdatePassword: FC<{}> = () => {
  const { handleSubmit, register, handlePasswordSubmitHandler, passwordInputs } =
    useUpdatePassword();

  return (
    <Accordeon position='accountManagePage' filtersBlock='Change your password'>
      <form
        className='space-y-4 pt-4 lg:space-y-8'
        onSubmit={handleSubmit(handlePasswordSubmitHandler)}
      >
        <ul className='space-y-4 lg:space-y-8'>
          {Array.isArray(passwordInputs) &&
            passwordInputs.map(({ placeholder, fieldValue, errors, label, ariaInvalid }) => (
              <li key={label}>
                <VerifiableInput
                  inputData={{
                    type: 'password',
                    placeholder,
                    fieldValue,
                  }}
                  errors={errors}
                  register={register}
                  label={label}
                  svgName='icon-password'
                  hasIcon={true}
                  variant={VariantVerifiableInputs.Account}
                  ariaInvalid={ariaInvalid}
                />
              </li>
            ))}
        </ul>
        <p className=' text-small text-darkBase dark:text-whiteBase lg:text-medium'>
          To change your current password, enter the new password in the first field and repeat the
          entry in the second field. In the third field, confirm the change by inputting your
          current password. If all information is entered correctly, you will receive a notification
          confirming the successful update of your password.
        </p>
        <PrimaryButton
          type='submit'
          width='w-28 lg:w-40'
          id='Button for applying change and confirm your new password'
          variant={VariantButton.Other}
        >
          Apply
        </PrimaryButton>
      </form>
    </Accordeon>
  );
};

export default UpdatePassword;
