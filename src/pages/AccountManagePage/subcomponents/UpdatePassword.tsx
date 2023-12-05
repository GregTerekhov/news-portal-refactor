import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { UpdatePasswordRequiredToValidate } from 'types';
import { useAuthCollector } from 'hooks';

import { Accordeon, PrimaryButton, VerifiableInput } from 'ui';

import { updatePasswordSchema } from '../assistants';

const UpdatePassword: FC<{}> = ({}) => {
  const { updatePassword } = useAuthCollector();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UpdatePasswordRequiredToValidate>({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      oldPassword: '',
    },
  });

  const [newPassword, confirmPassword, oldPassword] = watch([
    'newPassword',
    'confirmPassword',
    'oldPassword',
  ]);

  const handlePasswordSubmitHandler: SubmitHandler<UpdatePasswordRequiredToValidate> = async (
    data,
  ) => {
    console.log('Password data:', data);

    const { newPassword, oldPassword } = data;
    const dataToSend = { newPassword, oldPassword };

    await updatePassword(dataToSend);
    reset({
      ...getValues,
      newPassword: '',
      confirmPassword: '',
      oldPassword: '',
    });
  };

  const passwordInputs = [
    {
      placeholder: 'Enter new password',
      fieldValue: newPassword,
      errors: errors?.newPassword?.message,
      label: 'newPassword',
      ariaInvalid: errors?.newPassword ? true : false,
    },
    {
      placeholder: 'Confirm new password',
      fieldValue: confirmPassword,
      errors: errors?.confirmPassword?.message,
      label: 'confirmPassword',
      ariaInvalid: errors?.confirmPassword ? true : false,
    },
  ];

  const showCurrentPasswordInput =
    newPassword &&
    confirmPassword &&
    !errors?.newPassword?.message &&
    !errors?.confirmPassword?.message &&
    newPassword.length !== 0 &&
    confirmPassword.length !== 0;

  if (showCurrentPasswordInput) {
    passwordInputs.push({
      placeholder: 'Enter your current password',
      fieldValue: oldPassword,
      errors: errors?.oldPassword?.message,
      label: 'oldPassword',
      ariaInvalid: errors && errors?.oldPassword ? true : false,
    });
  }

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
                    placeholder: placeholder,
                    fieldValue: fieldValue,
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

{
  /* <VerifiableInput
          inputData={{
            type: 'password',
            placeholder: 'Enter new password',
            fieldValue: newPassword,
          }}
          errors={errors?.newPassword?.message}
          register={register}
          label='newPassword'
          svgName='icon-password'
          className='block'
          hasIcon={true}
          variant='accountPage'
          ariaInvalid={errors?.newPassword ? 'true' : 'false'}
        />
        <VerifiableInput
          inputData={{
            type: 'password',
            placeholder: 'Confirm new password',
            fieldValue: confirmPassword,
          }}
          errors={errors?.confirmPassword?.message}
          register={register}
          label='confirmPassword'
          svgName='icon-password'
          className='block'
          hasIcon={true}
          variant='accountPage'
          ariaInvalid={errors?.confirmPassword ? 'true' : 'false'}
        />
        {newPassword &&
        confirmPassword &&
        !errors?.newPassword?.message &&
        !errors?.confirmPassword?.message &&
        newPassword.length !== 0 &&
        confirmPassword.length !== 0 ? (
          <VerifiableInput
            inputData={{
              type: 'password',
              placeholder: 'Enter your current password',
            }}
            errors={errors?.oldPassword?.message}
            register={register}
            label='oldPassword'
            svgName='icon-password'
            className='fill-accentBase'
            hasIcon={true}
            variant='accountPage'
            ariaInvalid={errors?.oldPassword ? 'true' : 'false'}
          />
        ) : null} */
}
