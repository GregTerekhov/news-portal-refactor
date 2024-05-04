import React from 'react';

import { useWindowWidthContext } from 'contexts';

import SvgIcon from '../../SvgIcon/SvgIcon';

export const shouldShowPasswordIcon = (
  type: string | undefined,
  isPasswordVisibility: boolean,
  toggleVisibility: () => void,
): JSX.Element | null => {
  const { wideScreens } = useWindowWidthContext();

  return type === 'password' ? (
    <button
      aria-label='Password visibility button'
      type='button'
      onClick={toggleVisibility}
      className='absolute right-3 top-3 md:right-4'
    >
      <SvgIcon
        svgName={isPasswordVisibility ? 'eye-opened' : 'eye-closed'}
        sizeKey={wideScreens ? 'mdIcon24' : 'smIcon20'}
        className='fill-greyBase '
      />
    </button>
  ) : null;
};

export const shouldShowRecoveryPasswordSubmitButton = (
  forgotSubmitButtonStyles: string,
  placeholder: string | undefined,
  handleSubmitRecovery: React.MouseEventHandler<HTMLButtonElement> | undefined,
): JSX.Element | null => {
  return placeholder === 'Enter your current email' ? (
    <button type='submit' className={forgotSubmitButtonStyles} onClick={handleSubmitRecovery}>
      <SvgIcon svgName='arrow-right' sizeKey='smIcon20' className='fill-whiteBase' />
    </button>
  ) : null;
};

export const shouldShowForgotPasswordLabelSpan = (
  forgotPasswordLabelCondition: boolean,
  labelName: React.ReactNode,
): JSX.Element | null => {
  return forgotPasswordLabelCondition ? (
    <span className='mb-1.5 block font-medium text-accentBase'>{labelName}</span>
  ) : null;
};

export const shouldShowValidationErrorText = (
  fieldValue: string | string[] | undefined,
  errors: string | undefined,
): JSX.Element | null => {
  return fieldValue?.length !== 0 && errors ? (
    <p className='text-small text-darkBase dark:text-whiteBase md:text-medium'>{errors}</p>
  ) : null;
};

export const showIcon = (
  hasIcon: boolean | undefined,
  svgName: string | undefined,
): JSX.Element | null => {
  return hasIcon ? (
    <SvgIcon
      svgName={svgName}
      sizeKey='smIcon20'
      className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform items-center justify-center fill-accentBase'
    />
  ) : null;
};
