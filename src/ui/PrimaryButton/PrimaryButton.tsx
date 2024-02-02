import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import { ClickHandler, PrimaryButtonType, VariantButton } from 'types';

import SvgIcon from '../SvgIcon';
import { generateButtonStyles } from './assistants';

interface PBProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: PrimaryButtonType;
  onHandleClick?: ClickHandler;
  variant: VariantButton;
  children?: ReactNode;
  hasIcon?: boolean;
  svgName?: string | undefined;
  svgSize?: number;
  classNameIcon?: string | undefined;
  width?: string;
  classNameButton?: string | undefined;
  id?: string | undefined;
  ariaLabel?: string | undefined;
  disabled?: boolean | undefined;
}

const PrimaryButton = forwardRef<
  HTMLButtonElement,
  PBProps & { ref?: React.Ref<HTMLButtonElement> }
>(
  (
    {
      type = 'button',
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

    return (
      <button
        id={id}
        aria-label={ariaLabel}
        className={`flex items-center justify-center transition-colors duration-500 ${
          hasIcon ? 'gap-2.5' : ''
        } ${children ? 'text-base text-contrastWhite lg:text-medium' : ''} ${
          currentStyles.buttonStyles
        } ${classNameButton}`}
        type={type}
        onClick={onHandleClick}
        ref={ref}
        disabled={disabled}
      >
        {children}
        {hasIcon && <SvgIcon svgName={svgName} size={svgSize} className={classNameIcon} />}
      </button>
    );
  },
);

export default PrimaryButton;
