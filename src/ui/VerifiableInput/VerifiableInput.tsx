import React, { FC, useId, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import {
  CapitalizeInputLabel,
  IconName,
  InputLabel,
  InputType,
  VariantsPlaceholder,
  VariantVerifiableInputs,
  VerifiableInputValues,
} from 'types';

import {
  showIcon,
  shouldShowForgotPasswordLabelSpan,
  shouldShowPasswordIcon,
  shouldShowRecoveryPasswordSubmitButton,
  shouldShowValidationErrorText,
} from './subcomponents';

import { inputStyles } from './assistants';

interface InputCollectedData {
  type: InputType;
  placeholder: VariantsPlaceholder;
  fieldValue?: string | string[] | undefined;
  autoFocus?: boolean | undefined;
  labelName?: CapitalizeInputLabel;
  autofill?: string;
  disabled?: boolean | undefined;
}

type AriaInvalid = boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
type VerifiableInputRegister = UseFormRegister<VerifiableInputValues>;

interface IInputProps {
  inputData: InputCollectedData;
  hasIcon?: boolean;
  svgName?: IconName;
  variant: VariantVerifiableInputs;
  ariaInvalid: AriaInvalid;
  label: InputLabel;
  errors?: string | undefined;
  register: VerifiableInputRegister;
  handleSubmitRecovery?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const VerifiableInput: FC<IInputProps> = ({
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
  const [isPasswordVisibility, setIsPasswordVisibility] = useState(false);

  const id = useId();

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisibility(!isPasswordVisibility);
  };

  const { type, fieldValue, placeholder, labelName, autoFocus, autofill, disabled } = inputData;

  const { geometry, text } =
    inputStyles[variant === VariantVerifiableInputs.Account ? 'account' : 'auth'];

  const inputFieldStyles = `w-full py-2 ${geometry} border-accentBase dark:border-greyBase ${text} caret-accentBase dark:caret-whiteBase bg-transparent rounded-3xl border border-solid font-header text-small leading-mediumRelaxed tracking-bigWide outline-0 transition-colors md:text-base md:leading-moreRelaxed md:tracking-wide hg:text-medium ${autofill ? 'autofill:!bg-transparent autofill:dark:bg-darkBase' : ''}`;

  const forgotSubmitButtonStyles =
    'absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-accentBase hocus:bg-accentAlt';

  const forgotPasswordLabelCondition =
    variant === VariantVerifiableInputs.Auth && placeholder !== 'Enter your current email';

  return (
    <>
      <label
        htmlFor={`${id} ${label}`}
        className={` 
       ${variant === VariantVerifiableInputs.Auth ? 'w-full space-y-2 text-medium md:text-xl hg:text-2xl' : 'flex items-center justify-center'}`}
      >
        {labelName && shouldShowForgotPasswordLabelSpan(forgotPasswordLabelCondition, labelName)}
      </label>

      <div className={`relative ${errors && errors?.length > 0 ? 'mb-3' : 'mb-0'}`}>
        {shouldShowPasswordIcon(type, isPasswordVisibility, togglePasswordVisibility)}
        {showIcon(hasIcon, svgName)}
        {shouldShowRecoveryPasswordSubmitButton(
          forgotSubmitButtonStyles,
          placeholder,
          handleSubmitRecovery,
        )}
        <input
          className={inputFieldStyles}
          id={`${id} ${label}`}
          autoFocus={autoFocus}
          {...register(label)}
          type={isPasswordVisibility ? InputType.Text : type}
          value={fieldValue}
          placeholder={placeholder}
          autoComplete={autofill}
          aria-invalid={ariaInvalid}
          disabled={disabled}
        />
      </div>
      {errors && errors?.length > 0 && shouldShowValidationErrorText(fieldValue, errors)}
    </>
  );
};

export default VerifiableInput;
