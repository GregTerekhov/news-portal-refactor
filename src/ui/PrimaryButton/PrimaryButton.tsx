import React, { ButtonHTMLAttributes, HTMLProps, ReactNode, forwardRef } from 'react';

import SvgIcon from '../SvgIcon';
import { generateButtonStyles } from './assistants';

export type ButtonProps = HTMLProps<HTMLButtonElement>;

export type PrimaryButtonType = {
  type: 'button' | 'submit' | 'reset';
};

export type ClickHandler =
  | ((() => void) | undefined)
  | ((event: React.FormEvent) => void)
  | (() => Promise<void>)
  | ((e: React.MouseEvent<HTMLButtonElement>) => void);

export enum VariantButton {
  Primary = 'Primary',
  Other = 'OtherButton',
  Small = 'Small',
}

interface PBProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonData?: PrimaryButtonType;
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
      buttonData,
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
    const { type } = buttonData ?? { type: 'button' };
    const styles = generateButtonStyles({ disabled, width });
    const currentStyles = styles[variant];
    // const width = props.width ?? 'w-10';

    return (
      <button
        id={id}
        aria-label={ariaLabel}
        className={`flex items-center justify-center transition-colors duration-500 ${
          hasIcon ? 'gap-2.5' : ''
        } ${children ? 'text-base lg:text-medium text-contrastWhite' : ''} ${
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
