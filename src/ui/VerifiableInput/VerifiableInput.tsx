import React, { ReactNode, FC, useId, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { InputLabel, VariantVerifiableInputs } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

import SvgIcon from '../SvgIcon';

import { inputStyles } from './assistants';

interface InputCollectedData {
  type?: string;
  placeholder?: string;
  fieldValue?: string | string[] | undefined;
  autoFocus?: boolean | undefined;
  children?: ReactNode;
}

type AriaInvalid = boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;

interface InputProps {
  inputData: InputCollectedData;
  hasIcon: boolean;
  className?: string;
  svgName?: string;
  variant: VariantVerifiableInputs;
  ariaInvalid: AriaInvalid;
  label: InputLabel;
  errors?: string | undefined;
  // register: UseFormRegister<VerifiableInputValues>;
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

  const { type, fieldValue, placeholder, children, autoFocus } = inputData;

  const { geometry, border, bg, caret, text, placeholderStyle } =
    inputStyles[variant === VariantVerifiableInputs.Account ? 'account' : 'auth'];

  return (
    <label
      htmlFor={id + label}
      className={`
       ${variant === VariantVerifiableInputs.Auth && 'w-full space-y-2 text-medium md:text-xl'} 
      ${className}`}
    >
      {variant === VariantVerifiableInputs.Auth && placeholder !== 'Enter your current email' && (
        <span className='mb-1.5 block font-medium text-accentBase'>{children}</span>
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
              size={ICON_SIZES.smIcon20}
              className='absolute bottom-[9px] right-3 cursor-pointer fill-greyBase md:right-4'
            />
          </button>
        ) : null}
        {hasIcon && (
          <span className='absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center'>
            <SvgIcon svgName={svgName} size={ICON_SIZES.smIcon20} className='fill-accentBase' />
          </span>
        )}
        {placeholder === 'Enter your current email' ? (
          <button
            type='submit'
            className='absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-accentBase hover:bg-accentAlt'
            onClick={handleSubmitRecovery}
          >
            <SvgIcon
              svgName='icon-arrow-right'
              size={ICON_SIZES.smIcon20}
              className='fill-whiteBase'
            />
          </button>
        ) : null}
        <input
          className={` ${geometry} ${bg} ${border} ${text} ${caret} ${placeholderStyle} $ rounded-3xl border border-solid font-header text-small leading-mediumRelaxed tracking-bigWide outline-0 transition-colors md:text-base md:leading-moreRelaxed md:tracking-wide`}
          id={id + label}
          autoFocus={autoFocus}
          {...register(label)}
          type={isPasswordVisibility ? 'text' : type}
          value={fieldValue}
          placeholder={placeholder}
          autoComplete='off'
          aria-invalid={ariaInvalid}
        />
      </div>
      {fieldValue?.length !== 0 && errors && (
        <p className='text-small text-darkBase dark:text-whiteBase md:text-medium'>{errors}</p>
      )}
    </label>
  );
};

export default VerifiableInput;
