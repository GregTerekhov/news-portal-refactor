import React, { ReactNode, FC, useState } from 'react';
import SvgIcon from './SvgIcon';
import { useLocation } from 'react-router-dom';
import useHeaderStyles from 'hooks/useHeaderStyles';
import { useWindowWidth } from 'hooks/useWindowWidth';
import { useActiveLinks } from 'hooks';
import { Path, UseFormRegister } from 'react-hook-form';

type InputCollectedData = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  children: ReactNode;
};

enum V {
  Header = 'header',
  SearchBlock = 'searchBlock',
  Checkbox = 'checkbox',
  Auth = 'auth',
}

interface IFormValues {
  Name: string;
  Email: string;
  Password: string;
}

interface InputProps {
  inputData?: Partial<InputCollectedData>;
  hasIcon: boolean;
  className?: string;
  variant: string;
  hideInput?: (event: React.MouseEvent<HTMLInputElement>) => void;
  touched?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: Path<IFormValues>;
  register?: UseFormRegister<IFormValues>;
  required?: boolean;
}

const Input: FC<Partial<InputProps>> = (props) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const [isPasswordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { name, type, value, placeholder, children } = props.inputData || {};
  const hasIcon = props.hasIcon;
  const className = props.className;
  const variant = props.variant;
  const touched = props.touched;
  const onTouch = props.hideInput;
  const onChange = props.onChange;
  // const label = props.label;
  // const register = props.register;
  // const required = props.required;

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { inputClass } = useHeaderStyles(activeLinks.isHomeActive);

  const onHideInput = (event: React.MouseEvent<HTMLInputElement>) => {
    if (onTouch) {
      onTouch(event);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisibility);
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
    placeholderColor = 'placeholder:text-darkBase/[.4]';
  } else if (variant === V.Auth) {
    inputGeometry = 'w-full py-2 px-4 md:px-4';
    inputBorder = 'border-accentBase dark:border-whiteBase';
    inputBg = 'bg-transparent';
    caretColor = 'caret-accentBase dark:caret-whiteBase';
    textColor = 'text-darkBase dark:text-whiteBase';
  } else if (variant === V.Checkbox) {
    labelCheckbox = 'flex items-center cursor-pointer';
    checkboxStyles = 'sr-only';
  }

  return (
    <label
      htmlFor={name}
      className={`relative flex gap-x-4 ${hasIcon ? 'justify-center' : ''} ${
        labelCheckbox ? 'flex-row cursor-pointer items-center' : 'flex-col'
      } ${className}`}
    >
      {variant === V.SearchBlock && (
        <p className='text-darkBase dark:text-whiteBase mb-2 text-base'>
          Filter by <span className='capitalize'>{name}:</span>
        </p>
      )}
      {variant === V.Auth && (
        <>
          <span className={`${!hasIcon && 'mb-1.5 block'} text-accentBase font-medium`}>
            {children}
          </span>
          {type === 'password' ? (
            <button
              aria-label='Password visibility button'
              type='button'
              onClick={togglePasswordVisibility}
            >
              <SvgIcon
                svgName={`${isPasswordVisibility ? 'icon-eye-opened' : 'icon-eye-closed'}`}
                size={20}
                className='fill-greyBase absolute right-3 bottom-[9px] md:right-4 cursor-pointer'
              />
            </button>
          ) : null}
        </>
      )}
      <div
        className={`${variant === V.SearchBlock ? 'relative' : ''} ${
          variant === V.Checkbox
            ? `flex items-center justify-center w-6 h-6 sm:w-4 sm:h-4 rounded-sm cursor-pointer ${
                isChecked
                  ? 'bg-accentBase'
                  : 'bg-whiteBase border border-solid border-accentBase dark:border-0'
              }`
            : ''
        }`}
      >
        {variant === V.Checkbox ? (
          <SvgIcon
            svgName='icon-check'
            size={16}
            className={`${isChecked ? 'fill-whiteBase' : 'fill-none'}`}
          />
        ) : null}
        {hasIcon && (
          <span className='absolute w-5 h-5 left-3 top-50% transform -translate-y-1/2 flex items-center justify-center'>
            <SvgIcon svgName='icon-search' size={20} className={`${svgFill}`} />
          </span>
        )}
        <input
          className={` ${inputGeometry} ${checkboxStyles} transition-colors duration-500 font-header border-solid border rounded-3xl outline-0 text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide ${placeholderColor} ${inputBorder} ${inputBg} ${caretColor} ${textColor}`}
          id={name}
          name={name}
          type={isPasswordVisibility ? 'text' : type}
          value={value}
          checked={isChecked}
          placeholder={placeholder}
          autoComplete='off'
          onClick={onHideInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              setIsChecked(event.target.checked);
              onChange(event);
            }
          }}
          // {...register(label, { required })}
          required
        />
      </div>
      <span className={`${!hasIcon && 'block'} text-accentBase font-medium`}>
        {variant === V.Checkbox && children}{' '}
      </span>
    </label>
  );
};

export default Input;
