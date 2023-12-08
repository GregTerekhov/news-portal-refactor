import React, { FC } from 'react';

import { Accordeon, PrimaryButton, VerifiableInput } from 'ui';

import { useUpdateEmail } from '../hooks';

const UpdateEmail: FC<{}> = ({}) => {
  const { handleSubmit, register, emailInputs, handleEmailSubmitHandler } = useUpdateEmail();

  return (
    <Accordeon position='accountManagePage' filtersBlock='Change your email'>
      <form
        className='pt-4 space-y-4 lg:space-y-8'
        onSubmit={handleSubmit(handleEmailSubmitHandler)}
      >
        <ul className='space-y-4 lg:space-y-8'>
          {Array.isArray(emailInputs) &&
            emailInputs.map(
              ({ type, placeholder, fieldValue, errors, label, iconName, ariaInvalid }) => (
                <li key={label}>
                  <VerifiableInput
                    inputData={{
                      type,
                      placeholder,
                      fieldValue,
                    }}
                    errors={errors}
                    register={register}
                    label={label}
                    svgName={iconName}
                    className='fill-accentBase'
                    hasIcon={true}
                    variant='accountPage'
                    ariaInvalid={ariaInvalid}
                  />
                </li>
              ),
            )}
        </ul>
        <p className=' text-darkBase text-small lg:text-medium dark:text-whiteBase'>
          To change your current email, enter the new email and confirm by inputting your current
          password in the new field. If all information is entered correctly, you will receive a
          notification confirming the successful update of your email.
        </p>
        <PrimaryButton
          buttonData={{ type: 'submit' }}
          width='w-28 lg:w-40'
          id='Button for applying change your email '
          variant='OtherButton'
        >
          Apply
        </PrimaryButton>
      </form>
    </Accordeon>
  );
};

export default UpdateEmail;
