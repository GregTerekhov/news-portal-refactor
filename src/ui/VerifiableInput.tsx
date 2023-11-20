import React, { ReactNode, FC, useState } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

import {
  SignUpCredentials,
  SignInCredentials,
  IUpdateEmail,
  IUpdatePassword,
  IRecoveryPassword,
} from 'types';

import SvgIcon from './SvgIcon';

interface InputCollectedData {
  type?: string;
  placeholder?: string;
  value?: string;
  children?: ReactNode;
}

enum VariantInputs {
  Auth = 'auth',
  Account = 'accountPage',
}

export type IValues =
  | IUpdateEmail
  | IUpdatePassword
  | SignUpCredentials
  | SignInCredentials
  | IRecoveryPassword;

interface InputProps {
  inputData: InputCollectedData;
  hasIcon: boolean;
  className?: string;
  svgName?: string;
  variant: string;
  ariaInvalid: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
  label: Path<IValues>;
  errors?: string | undefined;
  register: UseFormRegister<any>;
  handleSubmitRecovery?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const VerifiableInput: FC<InputProps> = (props) => {
  const [isPasswordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const {
    inputData,
    hasIcon,
    svgName,
    className,
    variant,
    ariaInvalid,
    label,
    register,
    handleSubmitRecovery,
    errors,
  } = props;
  const { type, value, placeholder, children } = inputData;

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisibility);
  };

  let inputGeometry: string = '';
  let inputBorder: string = '';
  let inputBg: string = '';
  let caretColor: string = '';
  let textColor: string = '';
  let placeholderColor: string = '';

  if (variant === VariantInputs.Account) {
    inputGeometry = 'w-full py-2 pl-11 pr-3';
    inputBorder = 'border-accentBase dark:border-whiteBase';
    inputBg = 'bg-whiteBase';
    caretColor = 'caret-accentBase';
    textColor = 'text-accentBase';
    placeholderColor = 'placeholder:text-darkBase/[.4]';
  } else if (variant === VariantInputs.Auth) {
    inputGeometry = 'w-full py-2 px-4 md:px-4';
    inputBorder = 'border-accentBase dark:border-whiteBase';
    inputBg = 'bg-transparent';
    caretColor = 'caret-accentBase dark:caret-whiteBase';
    textColor = 'text-darkBase dark:text-whiteBase';
  }

  return (
    <label
      htmlFor={label}
      className={`
       ${variant === VariantInputs.Auth && 'w-full'} 
      ${className}`}
    >
      {variant === VariantInputs.Auth && (
        <>
          <span className='mb-1.5 block text-accentBase font-medium'>{children}</span>
        </>
      )}
      <div className='relative mb-4'>
        {type === 'password' ? (
          <button
            aria-label='Password visibility button'
            type='button'
            onClick={togglePasswordVisibility}
          >
            <SvgIcon
              svgName={`${isPasswordVisibility ? 'icon-eye-opened' : 'icon-eye-closed'}`}
              size={20}
              className='fill-greyBase absolute right-3 bottom-[9px] md:right-4 cursor-pointer'
            />
          </button>
        ) : null}
        {hasIcon && (
          <span className='absolute w-5 h-5 left-3 top-50% transform -translate-y-1/2 flex items-center justify-center'>
            <SvgIcon svgName={svgName} size={20} className='fill-accentBase' />
          </span>
        )}
        {label === 'recoveryEmail' ? (
          <div className='absolute right-2 top-1.5 rounded-full bg-accentBase w-8 h-8 flex items-center justify-center hover:bg-accentAlt cursor-pointer'>
            <button type='submit' onClick={handleSubmitRecovery}>
              <SvgIcon svgName='icon-arrow-right-filled' size={20} className='fill-whiteBase' />
            </button>
          </div>
        ) : null}
        <input
          className={` ${inputGeometry} ${inputBg} ${inputBorder} ${textColor} ${caretColor} ${placeholderColor} transition-colors duration-500 font-header border-solid border rounded-3xl outline-0 text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide $`}
          id={label}
          {...register(label)}
          type={isPasswordVisibility ? 'text' : type}
          value={value}
          placeholder={placeholder}
          autoComplete='off'
          aria-invalid={ariaInvalid}
        />
      </div>
      {errors && <p className='text-darkBase dark:text-whiteBase'>{errors}</p>}
    </label>
  );
};

export default VerifiableInput;