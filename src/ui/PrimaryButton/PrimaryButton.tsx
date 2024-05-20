import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import {
  ClickHandler,
  IconName,
  IconSizes,
  ButtonType,
  VariantButton,
  PrimaryButtonId,
} from 'types';

import { SvgIcon } from '..';

import { generateButtonStyles } from './assistants';

interface IPBProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  id?: PrimaryButtonId | undefined;
  variant: VariantButton;
  onHandleClick?: ClickHandler;
  ariaLabel?: string | undefined;
  classNameButton?: string | undefined;
  hasIcon?: boolean;
  svgName?: IconName | undefined;
  svgSize?: IconSizes | undefined;
  classNameIcon?: string | undefined;
  children?: ReactNode;
  disabled?: boolean | undefined;
  width?: string;
}

const PrimaryButton = forwardRef<
  HTMLButtonElement,
  IPBProps & { ref?: React.Ref<HTMLButtonElement> }
>(
  (
    {
      type = ButtonType.Button,
      onHandleClick,
      variant,
      children,
      hasIcon,
      svgName,
      svgSize,
      width = 'w-10',
      classNameIcon,
      classNameButton,
      id,
      ariaLabel,
      disabled,
    },
    ref,
  ) => {
    const styles = generateButtonStyles({ disabled, width });
    const currentStyles = styles[variant];

    const primaryButtonStyles = `flex items-center justify-center transition-colors duration-500 ${
      hasIcon ? 'gap-2.5' : ''
    } ${children ? 'text-base text-contrastWhite lg:text-medium hg:text-2xl' : ''} ${
      currentStyles.buttonStyles
    } ${classNameButton}`;

    return (
      <button
        id={id}
        aria-label={ariaLabel}
        className={primaryButtonStyles}
        type={type}
        onClick={onHandleClick}
        ref={ref}
        disabled={disabled}
      >
        {children}
        {hasIcon && <SvgIcon svgName={svgName} sizeKey={svgSize} className={classNameIcon} />}
      </button>
    );
  },
);

export default PrimaryButton;
