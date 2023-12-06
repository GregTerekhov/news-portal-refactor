import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IUpdateEmail } from 'types';
import { useAuthCollector } from 'hooks';

import { Accordeon, PrimaryButton, VerifiableInput } from 'ui';

import { updateEmailSchema } from '../assistants';

const UpdateEmail: FC<{}> = ({}) => {
  const { updateEmail } = useAuthCollector();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IUpdateEmail>({
    resolver: yupResolver(updateEmailSchema),
    defaultValues: {
      updatedEmail: '',
    },
  });

  const updatedEmail = watch('updatedEmail');

  const handleEmailSubmitHandler: SubmitHandler<IUpdateEmail> = async (data) => {
    await updateEmail(data);
    reset({
      ...getValues,
      updatedEmail: '',
      currentPassword: '',
    });
  };

  return (
    <Accordeon position='accountManagePage' filtersBlock='Change your email'>
      <form
        className='pt-4 space-y-4 lg:space-y-8'
        onSubmit={handleSubmit(handleEmailSubmitHandler)}
      >
        <VerifiableInput
          inputData={{
            placeholder: 'Enter new email',
            fieldValue: updatedEmail,
          }}
          errors={errors?.updatedEmail?.message}
          register={register}
          label='updatedEmail'
          svgName='icon-envelop'
          className='fill-accentBase'
          hasIcon={true}
          variant='accountPage'
          ariaInvalid={errors?.updatedEmail ? 'true' : 'false'}
        />
        {updatedEmail && !errors?.updatedEmail?.message && updatedEmail.length !== 0 ? (
          <VerifiableInput
            inputData={{
              type: 'password',
              placeholder: 'Enter your current password',
            }}
            errors={errors?.currentPassword?.message}
            register={register}
            label='currentPassword'
            svgName='icon-password'
            className='fill-accentBase'
            hasIcon={true}
            variant='accountPage'
            ariaInvalid={errors?.currentPassword ? 'true' : 'false'}
          />
        ) : null}

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
