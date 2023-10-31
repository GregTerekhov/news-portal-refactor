import React, { ReactNode, FC } from 'react';
import SvgIcon from './SvgIcon';
import { useLocation } from 'react-router-dom';
import useHeaderStyles from 'hooks/useHeaderStyles';
import { useWindowWidth } from 'hooks/useWindowWidth';

type InputCollectedData = {
  name: string;
  type: string;
  placeholder: string;
  children: ReactNode;
};

enum V {
  Header = 'header',
  SearchBlock = 'searchBlock',
  Checkbox = 'checkbox',
  Auth = 'auth',
}

interface InputProps {
  inputData?: Partial<InputCollectedData>;
  hasIcon: boolean;
  className: string;
  variant: string;
  hideInput?: (event: React.MouseEvent<HTMLInputElement>) => void;
  touched?: boolean;
}

const Input: FC<Partial<InputProps>> = (props) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { name, type, placeholder, children } = props.inputData || {};
  const hasIcon = props.hasIcon;
  const className = props.className;
  const variant = props.variant;
  const onTouch = props.hideInput;
  const touched = props.touched;

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { inputClass } = useHeaderStyles(isHomePage);

  const onHideInput = (event: React.MouseEvent<HTMLInputElement>) => {
    if (onTouch) {
      onTouch(event);
    }
  };

  let inputGeometry: string = '';
  let inputBorder: string = '';
  let labelCheckbox: string = '';
  let checkboxStyles: string = '';
  let inputBg: string = '';
  let svgFill: string = '';
  let caretColor: string = '';
  let textColor: string = '';
  let placeholderColor: string = '';

  if (variant === V.Header) {
    inputGeometry = `md:w-[213px] lg:w-72 md:py-[5px] md:pl-11 md:pr-3 transition-transform transition-[width] ${
      breakpointsForMarkup?.isMobile || breakpointsForMarkup?.isNothing
        ? touched
          ? 'translate-x-0 w-[173px] py-[5px] pl-11 pr-3'
          : 'translate-x-full w-[30px] p-0'
        : ''
    }`;
    inputBorder = inputClass.inputBorder;
    inputBg = 'bg-transparent';
    svgFill = inputClass.svgFill;
    caretColor = inputClass.caretColor;
    textColor = inputClass.textColor;
    placeholderColor = inputClass.placeholderColor;
  } else if (variant === V.SearchBlock) {
    inputGeometry = 'w-full py-2 pl-11 pr-3';
    inputBorder = 'border-accentBase dark:border-whiteBase';
    inputBg = 'bg-whiteBase';
    svgFill = 'fill-accentBase';
    caretColor = 'caret-accentBase';
    textColor = 'text-accentBase';
    placeholderColor = 'placeholder:text-placeholderText';
  } else if (variant === V.Auth) {
    inputGeometry = 'w-full py-2 px-4 md:px-4';
    inputBorder = 'border-accentBase dark:border-whiteBase';
    inputBg = 'bg-transparent';
    caretColor = 'caret-accentBase dark:caret-whiteBase';
    textColor = 'text-darkBase dark:text-whiteBase';
  } else if (variant === V.Checkbox) {
    labelCheckbox = 'flex items-center cursor-pointer';
    checkboxStyles = 'w-6 h-6 sm:w-4 sm:w-4 rounded-xl ';
  }

  return (
    <label
      htmlFor={name}
      className={`relative flex gap-x-4 ${hasIcon && 'justify-center'} ${
        labelCheckbox ? 'flex-row cursor-pointer' : 'flex-col'
      } ${className}`}
    >
      {variant === V.Auth && (
        <span className={`${!hasIcon && 'mb-1.5 block'} text-accentBase font-medium`}>
          {children}
        </span>
      )}
      {hasIcon && (
        <span className='absolute w-5 h-5 left-3 flex items-center justify-center'>
          <SvgIcon svgName='icon-search' size={20} className={`${svgFill}`} />
        </span>
      )}

      <input
        className={` ${inputGeometry} ${checkboxStyles} transition-colors duration-500 font-header border-solid border rounded-3xl outline-0 text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide ${placeholderColor} ${inputBorder} ${inputBg} ${caretColor} ${textColor}`}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        onClick={onHideInput}
      />
      <span className={`${!hasIcon && 'mb-1.5 block'} text-accentBase font-medium`}>
        {variant === V.Checkbox && children}{' '}
      </span>
    </label>
  );
};

export default Input;
