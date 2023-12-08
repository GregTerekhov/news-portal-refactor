import React, { ButtonHTMLAttributes, HTMLProps, ReactNode, forwardRef } from 'react';

import SvgIcon from './SvgIcon';

export type ButtonProps = HTMLProps<HTMLButtonElement>;

export type PrimaryButtonType = {
  type: 'button' | 'submit' | 'reset';
};

export type ClickHandler =
  | (() => void)
  | ((event: React.FormEvent) => void)
  | (() => Promise<void>)
  | ((e: React.MouseEvent<HTMLButtonElement>) => void);

enum VariantButton {
  Primary = 'Primary',
  Other = 'OtherButton',
  Small = 'Small',
}

interface PBProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonData?: PrimaryButtonType;
  onHandleClick?: ClickHandler;
  variant: string;
  children?: ReactNode;
  hasIcon?: boolean;
  svgName?: string | undefined;
  svgSize?: number;
  classNameIcon?: string | undefined;
  width?: string;
  classNameButton?: string | undefined;
  id?: string | undefined;
  ariaLabel?: string | undefined;
  disabled?: boolean;
}

const PrimaryButton = forwardRef<
  HTMLButtonElement,
  PBProps & { ref?: React.Ref<HTMLButtonElement> }
>((props, ref) => {
  const { type } = props.buttonData ?? { type: 'button' };
  const onHandleClick = props.onHandleClick;
  const variant = props.variant;
  const children = props.children;
  const hasIcon = props.hasIcon;
  const svgName = props.svgName;
  const svgSize = props.svgSize;
  const width = props.width ?? 'w-10';
  const classNameIcon = props.classNameIcon;
  const classNameButton = props.classNameButton;
  const id = props.id;
  const ariaLabel = props.ariaLabel;
  const disabled = props.disabled;

  let buttonStyles: string = '';

  if (variant === VariantButton.Primary) {
    buttonStyles =
      'w-full py-2 bg-accentBase hover:bg-accentAlt transition-colors duration-500 rounded-[20px]';
  } else if (variant === VariantButton.Other) {
    buttonStyles = `${width} max-lg:py-2.5 lg:py-2 border border-solid border-transparent dark:border-whiteBase rounded-[20px] bg-accentBase hover:bg-accentAlt transition-colors duration-500`;
  } else if (variant === VariantButton.Small) {
    buttonStyles = `${width} rounded-[10px] border border-solid`;
  }
  return (
    <button
      id={id}
      aria-label={ariaLabel}
      className={`flex items-center justify-center ${hasIcon ? 'gap-2.5' : ''} ${
        children ? 'text-base lg:text-medium text-contrastWhite' : ''
      } ${buttonStyles} ${classNameButton}`}
      type={type}
      onClick={onHandleClick}
      ref={ref}
      disabled={disabled}
    >
      {children}
      {hasIcon && <SvgIcon svgName={svgName} size={svgSize} className={classNameIcon} />}
    </button>
  );
});

export default PrimaryButton;
