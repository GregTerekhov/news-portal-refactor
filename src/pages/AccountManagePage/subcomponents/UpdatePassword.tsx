import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IUpdatePassword } from 'types';

import { Accordeon } from 'components';
import { PrimaryButton, VerifiableInput } from 'ui';

import { updatePasswordSchema } from '../assistants';

const UpdatePassword: FC<{}> = ({}) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IUpdatePassword>({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const [newPassword, confirmPassword] = watch(['newPassword', 'confirmPassword']);

  const handlePasswordSubmitHandler: SubmitHandler<IUpdatePassword> = (data) => {
    console.log('Password data:', data);
    reset({
      ...getValues,
      newPassword: '',
      confirmPassword: '',
      oldPassword: '',
    });
  };

  return (
    <Accordeon position='accountManagePage' filtersBlock='Change your password'>
      <form
        className='pt-4 space-y-4 lg:space-y-8'
        onSubmit={handleSubmit(handlePasswordSubmitHandler)}
      >
        <VerifiableInput
          inputData={{
            type: 'password',
            placeholder: 'Enter new password',
            fieldValue: newPassword,
          }}
          errors={errors?.newPassword?.message}
          register={register}
          label='newPassword'
          svgName='icon-password'
          className='fill-accentBase'
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
          className='fill-accentBase'
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
        ) : null}
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
