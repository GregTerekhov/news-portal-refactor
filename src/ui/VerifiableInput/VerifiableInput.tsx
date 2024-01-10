import React, { ReactNode, FC, useId, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

// import {
//   SignUpRequest,
//   AuthRequestWithoutName,
//   IUpdatePassword,
//   RecoveryPasswordRequest,
// } from 'types';

import SvgIcon from '../SvgIcon';

import { inputStyles } from './assistants';

interface InputCollectedData {
  type?: string;
  placeholder?: string;
  fieldValue?: string | string[] | undefined;
  children?: ReactNode;
}

type AriaInvalid = boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
export type InputLabel =
  | 'name'
  | 'email'
  | 'password'
  | 'newPassword'
  | 'confirmPassword'
  | 'recoveryEmail';

export enum VariantVerifiableInputs {
  Auth = 'auth',
  Account = 'accountPage',
}

// type Values = IUpdatePassword | SignUpRequest | AuthRequestWithoutName | RecoveryPasswordRequest;

interface InputProps {
  inputData: InputCollectedData;
  hasIcon: boolean;
  className?: string;
  svgName?: string;
  variant: VariantVerifiableInputs;
  ariaInvalid: AriaInvalid;
  label: InputLabel;
  errors?: string | undefined;
  register: UseFormRegister<any>;
  handleSubmitRecovery?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const VerifiableInput: FC<InputProps> = ({
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
}) => {
  const [isPasswordVisibility, setIsPasswordVisibility] = useState<boolean>(false);

  const id = useId(); // додається для розрізнення однакових label в різних інпутах, які знаходяться на одній сторінці

  const { type, fieldValue, placeholder, children } = inputData;

  const { geometry, border, bg, caret, text, placeholderStyle } =
    inputStyles[variant === VariantVerifiableInputs.Account ? 'account' : 'auth'];

  return (
    <label
      htmlFor={id + label}
      className={`
       ${variant === VariantVerifiableInputs.Auth && 'w-full space-y-2 text-medium md:text-xl'} 
      ${className}`}
    >
      {variant === VariantVerifiableInputs.Auth && label !== 'recoveryEmail' && (
        <span className='mb-1.5 block text-accentBase font-medium'>{children}</span>
      )}
      <div className={`relative ${variant === VariantVerifiableInputs.Auth ? '' : 'mb-4'}`}>
        {type === 'password' ? (
          <button
            aria-label='Password visibility button'
            type='button'
            onClick={() => setIsPasswordVisibility(!isPasswordVisibility)}
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
        {placeholder === 'Enter your current email' ? (
          <button
            type='submit'
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-accentBase w-8 h-8 flex items-center justify-center hover:bg-accentAlt cursor-pointer'
            onClick={handleSubmitRecovery}
          >
            <SvgIcon svgName='icon-arrow-right-filled' size={20} className='fill-whiteBase' />
          </button>
        ) : null}
        <input
          className={` ${geometry} ${bg} ${border} ${text} ${caret} ${placeholderStyle} transition-colors duration-500 font-header border-solid border rounded-3xl outline-0 text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide $`}
          id={id + label}
          {...register(label)}
          type={isPasswordVisibility ? 'text' : type}
          value={fieldValue}
          placeholder={placeholder}
          autoComplete='off'
          aria-invalid={ariaInvalid}
        />
      </div>
      {fieldValue?.length !== 0 && errors && (
        <p className='text-darkBase dark:text-whiteBase text-small md:text-medium'>{errors}</p>
      )}
    </label>
  );
};

export default VerifiableInput;
