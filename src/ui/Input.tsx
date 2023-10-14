import React from 'react';
import SvgIcon from './SvgIcon';

type InputCollectedData = { name: string; type: string; placeholder: string };

export enum V {
  Header = 'header',
  SearchBlock = 'searchBlock',
}

interface InputProps {
  inputData: InputCollectedData;
  hasIcon: boolean;
  variant: V;
}

const Input: React.FC<InputProps> = (props) => {
  const { name, type, placeholder } = props.inputData;
  const hasIcon = props.hasIcon;
  const variant = props.variant;

  let inputGeometry: string = '';
  let inputBorder: string = '';

  if (variant === V.Header) {
    inputGeometry = 'w-[173px] md:w-[213px] lg:w-72';
    inputBorder = 'border-darkBase';
  } else if (variant === V.SearchBlock) {
    inputGeometry = 'w-full';
    inputBorder = 'border-accentBase';
  }

  return (
    //Инпут пока что со своей рамкой при фокусе, будет исправлено в первых же правках
    <label className={`relative flex gap-4 items-center  ${inputGeometry}`}>
      {hasIcon && (
        <span className='absolute w-5 h-5 left-3 flex items-center justify-center'>
          <SvgIcon svgName='icon-search' size={20} stroke='stroke-none' fill='fill-black' />
        </span>
      )}

      <input
        className={`py-[5px] w-full pl-11 bg-whiteBase border-solid border  rounded-3xl outline-0 text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide ${inputBorder} `}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
      />
    </label>
  );
};

export default Input;
