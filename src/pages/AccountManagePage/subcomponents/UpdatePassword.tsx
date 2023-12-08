import React, { FC } from 'react';

import { Accordeon, PrimaryButton, VerifiableInput } from 'ui';

import { useUpdatePassword } from '../hooks';

const UpdatePassword: FC<{}> = () => {
  const { handleSubmit, register, handlePasswordSubmitHandler, passwordInputs } =
    useUpdatePassword();

  return (
    <Accordeon position='accountManagePage' filtersBlock='Change your password'>
      <form
        className='pt-4 space-y-4 lg:space-y-8'
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
                  variant='accountPage'
                  ariaInvalid={ariaInvalid}
                />
              </li>
            ))}
        </ul>
        <p className=' text-darkBase text-small lg:text-medium dark:text-whiteBase'>
          To change your current password, enter the new password in the first field and repeat the
          entry in the second field. In the third field, confirm the change by inputting your
          current password. If all information is entered correctly, you will receive a notification
          confirming the successful update of your password.
        </p>
        <PrimaryButton
          buttonData={{ type: 'submit' }}
          width='w-28 lg:w-40'
          id='Button for applying change and confirm your new password'
          variant='OtherButton'
        >
          Apply
        </PrimaryButton>
      </form>
    </Accordeon>
  );
};

export default UpdatePassword;
