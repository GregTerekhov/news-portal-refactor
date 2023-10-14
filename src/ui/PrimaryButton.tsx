import React, { ReactNode } from 'react';
import SvgIcon from './SvgIcon';
// import CategoriesDropDown from './CategoriesDropDown';

type PrimaryButtCommon = {
  type: 'button' | 'submit' | 'reset';
};

export enum PB {
  SearchBlock = 'SearchBlock',
  Other = 'OtherButton',
}

interface PBProps {
  buttonData: PrimaryButtCommon;
  onHandleClick: () => void;
  variant: PB;
  children: ReactNode;
  hasIcon: boolean;
}

const PrimaryButton: React.FC<Partial<PBProps>> = (props) => {
  // const [categories, setCategories] = useState<boolean>(false);
  const { type } = props.buttonData || { type: 'button' };
  const onHandleClick = props.onHandleClick;
  const variant = props.variant;
  const children = props.children;
  const hasIcon = props.hasIcon;

  // const onHandleClick = () => {
  //   setCategories(!categories);
  // };

  let buttonWidth: string = '';

  if (variant === PB.SearchBlock) {
    buttonWidth = 'w-full';
  } else if (variant === PB.Other) {
    buttonWidth = 'w-28';
  }

  return (
    // <div className='flex-col relative'>
    <button
      className={`flex items-center justify-center gap-2.5 bg-accentBase rounded-[20px] text-contrastWhite py-2 hover:bg-accentAlt transition-colors ${buttonWidth}`}
      type={type}
      onClick={onHandleClick}
    >
      {children}
      {hasIcon && <SvgIcon svgName='icon-reset' size={16} stroke='stroke-none' fill='#f4f4f4' />}
    </button>
    // {categories && <CategoriesDropDown />}
    // </div>
  );
};

export default PrimaryButton;
