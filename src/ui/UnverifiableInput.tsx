import React, { ReactNode, FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useHeaderStyles, useActiveLinks, useWindowWidth } from 'hooks';

import SvgIcon from './SvgIcon';

interface InputCollectedData {
  id?: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  children: ReactNode;
}

enum VariantInputs {
  Header = 'header',
  FilterServiceBlock = 'filterServiceBlock',
  Checkbox = 'checkbox',
  RadioTheme = 'themeChanger',
}

interface InputProps {
  inputData?: Partial<InputCollectedData>;
  isChecked?: boolean;
  hasIcon: boolean;
  className?: string;
  svgName?: string;
  variant: string;
  hideInput?: (event: React.MouseEvent<HTMLInputElement>) => void;
  touched?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UnverifiableInput: FC<InputProps> = (props) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const {
    inputData,
    hasIcon,
    svgName,
    className,
    isChecked,
    variant,
    touched,
    hideInput,
    onChange,
  } = props;
  const { id, name, type, value, placeholder, children } = inputData ?? {};

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { inputClass } = useHeaderStyles(activeLinks.isHomeActive);

  const onHideInput = (event: React.MouseEvent<HTMLInputElement>) => {
    if (hideInput) {
      hideInput(event);
    }
  };

  let inputGeometry: string = '';
  let inputBorder: string = '';
  let inputBg: string = '';
  let svgFill: string = '';
  let caretColor: string = '';
  let textColor: string = '';
  let placeholderColor: string = '';
  let labelCheckbox: string = '';
  let checkboxStyles: string = '';

  if (variant === VariantInputs.Header) {
    inputGeometry = `md:w-48 lg:w-72 md:py-[5px] md:pl-11 md:pr-3 transition-transform transition-[width] ${
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
  } else if (variant === VariantInputs.FilterServiceBlock) {
    inputGeometry = 'w-full py-2 pl-11 pr-3';
    inputBorder = 'border-accentBase dark:border-whiteBase';
    inputBg = 'bg-whiteBase';
    svgFill = 'fill-accentBase';
    caretColor = 'caret-accentBase';
    textColor = 'text-accentBase';
    placeholderColor = 'placeholder:text-darkBase/[.4]';
  } else if (variant === VariantInputs.Checkbox) {
    labelCheckbox = 'flex items-center cursor-pointer gap-x-4';
    checkboxStyles = 'sr-only';
  }

  return (
    <>
      {variant !== VariantInputs.RadioTheme ? (
        <label
          htmlFor={name}
          className={`relative flex ${hasIcon ? 'justify-center' : ''} ${
            labelCheckbox ? 'flex-row' : 'flex-col'
          }
          ${
            variant === VariantInputs.FilterServiceBlock ||
            (variant === VariantInputs.Header && 'gap-x-4') ||
            (variant === VariantInputs.Checkbox && 'items-center cursor-pointer gap-x-4')
          } ${className}`}
        >
          {variant === VariantInputs.FilterServiceBlock && (
            <p className='text-darkBase dark:text-whiteBase mb-2 text-base'>
              {name === 'query' ? 'Search' : 'Filter'} by{' '}
              <span className='capitalize'>{name}:</span>
            </p>
          )}
          <div
            className={`${variant === VariantInputs.FilterServiceBlock ? 'relative' : ''} ${
              variant === VariantInputs.Checkbox
                ? `flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-sm cursor-pointer ${
                    isChecked
                      ? 'bg-accentBase'
                      : 'bg-whiteBase border border-solid border-accentBase dark:border-0'
                  }`
                : ''
            }`}
          >
            {variant === VariantInputs.Checkbox ? (
              <SvgIcon
                svgName='icon-check'
                size={16}
                className={`${isChecked ? 'fill-whiteBase' : 'fill-none'}`}
              />
            ) : null}
            {hasIcon && (
              <span className='absolute w-5 h-5 left-3 top-50% transform -translate-y-1/2 flex items-center justify-center'>
                <SvgIcon svgName={svgName} size={20} className={`${svgFill}`} />
              </span>
            )}
            <input
              className={` ${inputGeometry} transition-colors duration-500 font-header border-solid border rounded-3xl outline-0 text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide ${placeholderColor} ${inputBorder} ${inputBg} ${caretColor} ${textColor} ${checkboxStyles}`}
              id={name}
              name={name}
              type={type}
              value={value}
              placeholder={placeholder}
              autoComplete='off'
              onClick={onHideInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (onChange) {
                  onChange(event);
                }
              }}
            />
          </div>
          <span className={`${!hasIcon && 'block'} text-accentBase font-medium`}>{children}</span>
        </label>
      ) : (
        <>
          <div className='flex items-center justify-center'>
            <input
              id={id}
              type='radio'
              value=''
              name='colored-radio'
              className={`w-4 h-4 md:w-6 md:h-6 border border-solid md:border-2 bg-contrastWhite dark:bg-darkBase  ${className}`}
            />
            <label htmlFor={id}></label>
          </div>
        </>
      )}
    </>
  );
};

export default UnverifiableInput;
