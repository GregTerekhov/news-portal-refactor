import React, { ReactNode, FC, useId, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { InputLabel, VariantVerifiableInputs, VerifiableInputValues } from 'types';
import { useWindowWidthContext } from 'contexts';

import SvgIcon from '../SvgIcon/SvgIcon';

import { inputStyles } from './assistants';

interface InputCollectedData {
  type?: string;
  placeholder?: string;
  fieldValue?: string | string[] | undefined;
  autoFocus?: boolean | undefined;
  labelName?: ReactNode;
  autofill?: string;
  disabled?: boolean;
}

type AriaInvalid = boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
type VerifiableInputRegister = UseFormRegister<VerifiableInputValues>;

interface InputProps {
  inputData: InputCollectedData;
  hasIcon?: boolean;
  svgName?: string;
  variant: VariantVerifiableInputs;
  ariaInvalid: AriaInvalid;
  label: InputLabel;
  errors?: string | undefined;
  register: VerifiableInputRegister;
  handleSubmitRecovery?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const VerifiableInput: FC<InputProps> = ({
  inputData,
  hasIcon,
  svgName,
  variant,
  ariaInvalid,
  label,
  register,
  handleSubmitRecovery,
  errors,
}) => {
  const [isPasswordVisibility, setIsPasswordVisibility] = useState<boolean>(false);

  const { wideScreens } = useWindowWidthContext();

  const id = useId();

  const { type, fieldValue, placeholder, labelName, autoFocus, autofill, disabled } = inputData;

  const { geometry, border, bg, caret, text, placeholderStyle } =
    inputStyles[variant === VariantVerifiableInputs.Account ? 'account' : 'auth'];

  const inputFieldStyles = `${geometry} ${bg} ${border} ${text} ${caret} ${placeholderStyle} rounded-3xl border border-solid font-header text-small leading-mediumRelaxed tracking-bigWide outline-0 transition-colors md:text-base md:leading-moreRelaxed md:tracking-wide hg:text-medium`;

  const forgotSubmitButtonStyles =
    'absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-accentBase hocus:bg-accentAlt';

  const forgotPasswordLabelCondition =
    variant === VariantVerifiableInputs.Auth && placeholder !== 'Enter your current email';

  const shouldPasswordShowIcon = (type: string | undefined): JSX.Element | null => {
    return type === 'password' ? (
      <button
        aria-label='Password visibility button'
        type='button'
        onClick={() => setIsPasswordVisibility(!isPasswordVisibility)}
        className='absolute right-3 top-3 md:right-4'
      >
        <SvgIcon
          svgName={`${isPasswordVisibility ? 'eye-opened' : 'eye-closed'}`}
          sizeKey={wideScreens ? 'mdIcon24' : 'smIcon20'}
          className='fill-greyBase '
        />
      </button>
    ) : null;
  };

  const showRecoveryPasswordSubmitButton = (
    placeholder: string | undefined,
  ): JSX.Element | null => {
    return placeholder === 'Enter your current email' ? (
      <button
        type='submit'
        className={`${forgotSubmitButtonStyles}`}
        onClick={handleSubmitRecovery}
      >
        <SvgIcon svgName='arrow-right' sizeKey='smIcon20' className='fill-whiteBase' />
      </button>
    ) : null;
  };

  const showForgotPasswordLabelSpan = (): JSX.Element | null => {
    return forgotPasswordLabelCondition ? (
      <span className='mb-1.5 block font-medium text-accentBase'>{labelName}</span>
    ) : null;
  };

  const showValidationErrorText = (): JSX.Element | null => {
    return fieldValue?.length !== 0 && errors ? (
      <p className='text-small text-darkBase dark:text-whiteBase md:text-medium'>{errors}</p>
    ) : null;
  };

  const showIcon = (): JSX.Element | null => {
    return hasIcon ? (
      <SvgIcon
        svgName={svgName}
        sizeKey='smIcon20'
        className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform items-center justify-center fill-accentBase'
      />
    ) : null;
  };

  return (
    <>
      <label
        htmlFor={id + label}
        className={` 
       ${variant === VariantVerifiableInputs.Auth ? 'w-full space-y-2 text-medium md:text-xl hg:text-2xl' : 'flex items-center justify-center'}`}
      >
        {showForgotPasswordLabelSpan()}
      </label>

      <div className={`relative ${errors ? 'mb-3' : 'mb-0'}`}>
        {shouldPasswordShowIcon(type)}
        {showIcon()}
        {showRecoveryPasswordSubmitButton(placeholder)}
        <input
          className={`${inputFieldStyles}`}
          id={id + label}
          autoFocus={autoFocus}
          {...register(label)}
          type={isPasswordVisibility ? 'text' : type}
          value={fieldValue}
          placeholder={placeholder}
          autoComplete={autofill}
          aria-invalid={ariaInvalid}
          disabled={disabled}
        />
      </div>
      {showValidationErrorText()}
    </>
  );
};

export default VerifiableInput;
