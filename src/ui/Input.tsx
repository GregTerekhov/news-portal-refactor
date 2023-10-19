import React, { ReactNode, FC } from 'react';
import SvgIcon from './SvgIcon';

type InputCollectedData = { name: string; type: string; placeholder: string; children: ReactNode };

enum V {
  Header = 'header',
  SearchBlock = 'searchBlock',
  Checkbox = 'checkbox',
}

interface InputProps {
  inputData: Partial<InputCollectedData>;
  hasIcon: boolean;
  variant: string;
}

const Input: FC<InputProps> = (props) => {
  const { name, type, placeholder, children } = props.inputData;
  const hasIcon = props.hasIcon;
  const variant = props.variant;

  let inputGeometry: string = '';
  let inputBorder: string = '';
  let labelCheckbox: string = '';
  let checkboxStyles: string = '';

  if (variant === V.Header) {
    inputGeometry = 'w-[173px] md:w-[213px] lg:w-72 py-[5px]';
    inputBorder = 'border-darkBase';
  } else if (variant === V.SearchBlock) {
    inputGeometry = 'w-full py-2';
    inputBorder = 'border-accentBase';
  } else if (variant === V.Checkbox) {
    labelCheckbox = 'flex items-center cursor-pointer';
    checkboxStyles = 'w-6 h-6 sm:w-4 sm:w-4 rounded-xl ';
  }

  return (
    <label
      className={`relative flex gap-x-4 ${hasIcon && 'justify-center'} ${
        labelCheckbox ? 'flex-row cursor-pointer' : 'flex-col'
      }`}
    >
      {variant === V.Header ||
        (variant === V.SearchBlock && (
          <span className={`${!hasIcon && 'mb-1.5 block'} text-accentBase font-medium`}>
            {children}
          </span>
        ))}
      {hasIcon && (
        <span className='absolute w-5 h-5 left-3 flex items-center justify-center'>
          <SvgIcon svgName='icon-search' size={20} className='fill-darkBase' />
        </span>
      )}

      <input
        className={` ${inputGeometry} ${checkboxStyles} ${
          hasIcon ? 'pl-11 pr-3' : 'px-4 md:px-4'
        } font-header border-solid border caret-accentBase rounded-3xl outline-0 text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide ${inputBorder} `}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
      />
      <span className={`${!hasIcon && 'mb-1.5 block'} text-accentBase font-medium`}>
        {variant === V.Checkbox && children}{' '}
      </span>
    </label>
  );
};

export default Input;
