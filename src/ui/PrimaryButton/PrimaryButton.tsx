import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import { ClickHandler, PrimaryButtonType, VariantButton } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

import SvgIcon from '../SvgIcon/SvgIcon';
import { generateButtonStyles } from './assistants';

interface PBProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: PrimaryButtonType;
  onHandleClick?: ClickHandler;
  variant: VariantButton;
  children?: ReactNode;
  hasIcon?: boolean;
  svgName?: string | undefined;
  svgSize?: keyof typeof ICON_SIZES | undefined;
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
