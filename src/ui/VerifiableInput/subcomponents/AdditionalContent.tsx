import React from 'react';

import {
  ButtonType,
  CapitalizeInputLabel,
  IconName,
  IconSizes,
  InputType,
  VariantsPlaceholder,
} from 'types';
import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from '../..';

export const shouldShowPasswordIcon = (
  type: InputType | undefined,
  isPasswordVisibility: boolean,
  toggleVisibility: () => void,
): JSX.Element | null => {
  const { isWideScreens } = useWindowWidthContext();

  return type === InputType.Password ? (
    <button
      aria-label='Password visibility button'
      type={ButtonType.Button}
      onClick={toggleVisibility}
      className='absolute right-3 top-3 md:right-4'
    >
      <SvgIcon
        svgName={isPasswordVisibility ? IconName.OpenedEye : IconName.ClosedEye}
        sizeKey={isWideScreens ? IconSizes.mdIcon24 : IconSizes.smIcon20}
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
  return placeholder === VariantsPlaceholder.RecoveryPassword ? (
    <button className={forgotSubmitButtonStyles} onClick={handleSubmitRecovery}>
      <SvgIcon
        svgName={IconName.ArrowToRight}
        sizeKey={IconSizes.smIcon20}
        className='fill-whiteBase'
      />
    </button>
  ) : null;
};

export const shouldShowForgotPasswordLabelSpan = (
  forgotPasswordLabelCondition: boolean,
  labelName: CapitalizeInputLabel,
): JSX.Element | null => {
  return forgotPasswordLabelCondition ? (
    <span className='mb-1.5 block font-medium text-accentBase'>{labelName}</span>
  ) : null;
};

export const shouldShowValidationErrorText = (
  fieldValue: string | string[] | undefined,
  errors: string | undefined,
): JSX.Element | null => {
  const shouldShowErrorText =
    errors &&
    ((fieldValue?.length === 0 && errors?.length > 0) ||
      (fieldValue?.length !== 0 && errors?.length > 0));

  return shouldShowErrorText ? (
    <p className='text-small text-darkBase dark:text-whiteBase md:text-medium'>{errors}</p>
  ) : null;
};

export const showIcon = (
  hasIcon: boolean | undefined,
  svgName: IconName | undefined,
): JSX.Element | null => {
  return hasIcon && svgName ? (
    <SvgIcon
      svgName={svgName}
      sizeKey={IconSizes.smIcon20}
      className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform items-center justify-center fill-accentBase'
    />
  ) : null;
};
