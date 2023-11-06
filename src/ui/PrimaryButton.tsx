import React, { ReactNode } from 'react';
import SvgIcon from './SvgIcon';

type PrimaryButtCommon = {
  type: 'button' | 'submit' | 'reset';
};

export type ClickHandler =
  | (() => void)
  | ((event: React.FormEvent) => void)
  | (() => Promise<void>);

enum PB {
  SearchBlock = 'SearchBlock',
  Other = 'OtherButton',
}

interface PBProps {
  buttonData: PrimaryButtCommon;
  onHandleClick: ClickHandler;
  variant: string;
  children: ReactNode;
  hasIcon: boolean;
  svgName: string;
  svgSize: number;
  className: string;
}

const PrimaryButton: React.FC<Partial<PBProps>> = (props) => {
  const { type } = props.buttonData || { type: 'button' };
  const onHandleClick = props.onHandleClick;
  const variant = props.variant;
  const children = props.children;
  const hasIcon = props.hasIcon;
  const svgName = props.svgName;
  const svgSize = props.svgSize;
  const className = props.className;

  let buttonWidth: string = '';

  if (variant === PB.SearchBlock) {
    buttonWidth = 'w-full py-2';
  } else if (variant === PB.Other) {
    buttonWidth = 'w-28';
  }
  return (
    <button
      className={`flex items-center justify-center gap-2.5 bg-accentBase rounded-[20px] text-base text-contrastWhite hover:bg-accentAlt transition-colors duration-500 ${buttonWidth} ${
        hasIcon ? 'max-lg:py-2.5 lg:py-2' : 'py-1.5'
      }`}
      type={type}
      onClick={onHandleClick}
    >
      {children}
      {hasIcon && <SvgIcon svgName={svgName} size={svgSize} className={className} />}
    </button>
  );
};

export default PrimaryButton;
