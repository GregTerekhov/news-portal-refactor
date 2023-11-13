import React, { useState } from 'react';
import { Input, PrimaryButton } from 'ui';
import ThemeSwitcher from './ThemeSwitcher';
import { usePopUp, useWindowWidth } from 'hooks';
import { useAppDispatch } from 'redux/hooks';
import { signIn } from 'redux/auth';
// import { Path, useForm, UseFormRegister, SubmitHandler } from 'react-hook-form';

type SignInProps = {
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowRecoveryInput: () => void;
  isShowRecoveryInput: boolean;
};

// interface IFormValues {
//   Name: string;
//   Email: string;
//   Password: string;
// }

const SignInPanel = ({
  handleCheckboxChange,
  handleShowRecoveryInput,
  isShowRecoveryInput,
}: SignInProps) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const { setIsOpenModal } = usePopUp();

  // const { register, handleSubmit } = useForm();
  // const onSubmit: SubmitHandler<Partial<IFormValues>> = (data) => {
  // alert(JSON.stringify(data));
  // };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const targetInput = e.currentTarget.name;
    const inputValue = e.currentTarget.value;

    switch (targetInput) {
      case 'email':
        setEmail(inputValue);
        break;
      case 'password':
        setPassword(inputValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };
    console.log(credentials);

    await dispatch(signIn(credentials));
    setIsOpenModal(false);
  };

  return (
    <form className='flex flex-col gap-3.5' onSubmit={(e) => handleSubmit(e)}>
      <Input
        inputData={{
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email',
          children: 'Email',
        }}
        hasIcon={false}
        variant='auth'
        // label='Email'
        // register={register}
        onChange={handleChange}
        required
      />
      <Input
        inputData={{
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password',
          children: 'Password',
        }}
        hasIcon={false}
        variant='auth'
        onChange={handleChange}
        required
      />
      <div className='text-center'>
        <button
          id='Show password recovery input'
          type='button'
          className='text-small md:text-medium text-darkBase dark:text-whiteBase'
          onClick={handleShowRecoveryInput}
        >
          Forgot password?
        </button>
        {isShowRecoveryInput ? (
          <Input
            inputData={{
              name: 'recoveryEmail',
              type: 'email',
              placeholder: 'Enter your email',
            }}
            hasIcon={false}
            variant='auth'
          />
        ) : null}
      </div>
      <Input
        inputData={{
          name: 'checkbox',
          type: 'checkbox',
          children: 'Remember me',
        }}
        hasIcon={false}
        variant='checkbox'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event)}
      />
      <div className='max-md:flex max-md:justify-between max-md:items-center'>
        <PrimaryButton
          buttonData={{ type: 'submit' }}
          id='Login button'
          variant='OtherButton'
          classNameButton='w-32'
        >
          Log In
        </PrimaryButton>
        {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
          <ThemeSwitcher variant='modal' />
        ) : null}
      </div>
    </form>
  );
};

export default SignInPanel;
