import React, { ReactNode, FC } from 'react';
import { useLocation } from 'react-router-dom';

import { VariantInputs } from 'types';
import { useWindowWidth } from 'contexts';
import { useHeaderStyles, useActiveLinks } from 'hooks';

import SvgIcon from '../SvgIcon';

import { generateInputStyles } from './assistants';

interface InputCollectedData {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  children: ReactNode;
}

interface InputProps {
  inputData?: Partial<InputCollectedData>;
  isChecked?: boolean;
  hasIcon: boolean;
  className?: string;
  svgName?: string;
  variant: VariantInputs;
  hideInput?: (event: React.MouseEvent<HTMLInputElement>) => void;
  touched?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UnverifiableInput: FC<InputProps> = ({
  inputData,
  hasIcon,
  svgName,
  className,
  isChecked,
  variant,
  touched,
  hideInput,
  onChange,
}) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const { name, type, value, placeholder, children } = inputData ?? {};

  const location = useLocation();
  const { isHomeActive } = useActiveLinks(location);
  const { inputClass } = useHeaderStyles(isHomeActive);

  const isMobile = breakpointsForMarkup?.isMobile || breakpointsForMarkup?.isNothing;

  const onHideInput = (event: React.MouseEvent<HTMLInputElement>) => {
    if (hideInput) {
      hideInput(event);
    }
  };

  const styles = generateInputStyles({ isMobile, touched, inputClass });
  const currentStyles = styles[variant];

  return (
    <label
      htmlFor={name}
      className={`relative flex ${hasIcon ? 'justify-center' : ''} ${
        currentStyles.labelCheckbox ? 'flex-row' : 'flex-col'
      }
          ${
            variant === VariantInputs.FilterServiceBlock ||
            (variant === VariantInputs.Header && 'gap-x-4') ||
            (variant === VariantInputs.Checkbox && 'items-center cursor-pointer gap-x-4')
          } ${className}`}
    >
      {variant === VariantInputs.FilterServiceBlock && (
        <p className='text-darkBase dark:text-greyAlt mb-2 text-base'>
          {name === 'query' ? 'Search' : 'Filter'} by <span className='capitalize'>{name}:</span>
        </p>
      )}
      <div
        className={`${variant === VariantInputs.FilterServiceBlock ? 'relative' : ''} ${
          variant === VariantInputs.Checkbox
            ? `flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-sm cursor-pointer border border-solid ${
                isChecked ? 'bg-accentBase border-whiteBase' : 'bg-whiteBase border-accentBase'
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
          <div
            className={`${
              variant === VariantInputs.Header ? currentStyles.svgWrapperClass : 'left-3'
            } absolute w-5 h-5 top-50% transform -translate-y-1/2 flex items-center justify-center`}
          >
            <SvgIcon svgName={svgName} size={20} className={`${currentStyles.svgFill}`} />
          </div>
        )}
        <input
          className={` ${currentStyles.inputGeometry} transition-colors duration-500 font-header border-solid border rounded-3xl outline-0 focus:outline-0 text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide ${currentStyles.placeholderColor} ${currentStyles.inputBorder} ${currentStyles.inputBg} ${currentStyles.caretColor} ${currentStyles.textColor} ${currentStyles.checkboxStyles}`}
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
  );
};

export default UnverifiableInput;
