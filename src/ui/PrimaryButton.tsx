import React, { ReactNode } from 'react';

import SvgIcon from './SvgIcon';

type PrimaryButtCommon = {
  type: 'button' | 'submit' | 'reset';
};

export type ClickHandler =
  | (() => void)
  | ((event: React.FormEvent) => void)
  | (() => Promise<void>)
  | ((e: React.MouseEvent) => void);

enum PB {
  Primary = 'Primary',
  Other = 'OtherButton',
  Small = 'Small',
}

interface PBProps {
  buttonData: PrimaryButtCommon;
  onHandleClick: ClickHandler;
  variant: string;
  children?: ReactNode;
  hasIcon?: boolean;
  svgName: string;
  svgSize: number;
  classNameIcon: string;
  width?: string;
  classNameButton?: string;
  id?: string;
  ariaLabel?: string;
  dataTooltipTarget?: string;
  dataTooltipPlacement?: string;
  tooltipText?: string;
}

const PrimaryButton: React.FC<Partial<PBProps>> = (props) => {
  const { type } = props.buttonData ?? { type: 'button' };
  const onHandleClick = props.onHandleClick;
  const variant = props.variant;
  const children = props.children;
  const hasIcon = props.hasIcon;
  const svgName = props.svgName;
  const svgSize = props.svgSize;
  const width = props.width;
  const classNameIcon = props.classNameIcon;
  const classNameButton = props.classNameButton;
  const id = props.id;
  const ariaLabel = props.ariaLabel;
  const dataTooltipTarget = props.dataTooltipTarget;
  const dataTooltipPlacement = props.dataTooltipPlacement;
  const tooltipText = props.tooltipText;

  let buttonStyles: string = '';

  if (variant === PB.Primary) {
    buttonStyles =
      'w-full py-2 bg-accentBase hover:bg-accentAlt transition-colors duration-500 rounded-[20px]';
  } else if (variant === PB.Other) {
    buttonStyles = `${width} max-lg:py-2.5 lg:py-2 rounded-[20px] bg-accentBase hover:bg-accentAlt transition-colors duration-500`;
  } else if (variant === PB.Small) {
    buttonStyles = 'w-10 rounded-[10px] border border-solid';
  }
  return (
    <>
      <button
        id={id}
        aria-label={ariaLabel}
        className={`flex items-center justify-center ${hasIcon ? 'gap-2.5' : ''} ${
          children ? 'text-base lg:text-medium text-contrastWhite' : ''
        } ${buttonStyles} ${classNameButton}`}
        type={type}
        onClick={onHandleClick}
        data-tooltip-target={dataTooltipTarget}
        data-tooltip-placement={dataTooltipPlacement}
      >
        {children}
        {hasIcon && <SvgIcon svgName={svgName} size={svgSize} className={classNameIcon} />}
      </button>

      {variant === PB.Small ? (
        <div
          id={dataTooltipTarget}
          role='tooltip'
          className='absolute z-40 invisible inline-block px-3 py-2 text-sm font-medium text-whiteBase bg-accentBase/[.9] rounded-lg shadow-sm opacity-0 tooltip'
        >
          {tooltipText}
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>
      ) : null}
    </>
  );
};

export default PrimaryButton;
