import React, { ReactNode, FC } from 'react';

import { VariantInputs } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';
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
  const { breakpointsForMarkup } = useWindowWidth();

  const { name, type, value, placeholder, children } = inputData ?? {};

  const { isHomeActive } = useActiveLinks();
  const { inputClass } = useHeaderStyles(isHomeActive);

  const isMobile = breakpointsForMarkup?.isMobile || breakpointsForMarkup?.isNothing;

  const onHideInput = (event: React.MouseEvent<HTMLInputElement>) => {
    if (hideInput) {
      hideInput(event);
    }
  };

  const styles = generateInputStyles({ isMobile, touched, inputClass });
  const {
    labelCheckbox,
    svgWrapperClass,
    svgFill,
    inputGeometry,
    placeholderColor,
    inputBg,
    inputBorder,
    caretColor,
    checkboxStyles,
    textColor,
  } = styles[variant];

  return (
    <label
      htmlFor={name}
      className={`relative flex ${hasIcon ? 'justify-center' : ''} ${
        labelCheckbox ? 'flex-row' : 'flex-col'
      }
          ${
            variant === VariantInputs.FilterServiceBlock ||
            (variant === VariantInputs.Header && 'gap-x-4') ||
            (variant === VariantInputs.Checkbox && 'cursor-pointer items-center gap-x-4')
          } ${className}`}
    >
      {variant === VariantInputs.FilterServiceBlock && (
        <p className='mb-2 text-base text-darkBase dark:text-greyAlt'>
          {name === 'query' ? 'Search' : 'Filter'} by <span className='capitalize'>{name}:</span>
        </p>
      )}
      <div
        className={`${variant === VariantInputs.FilterServiceBlock ? 'relative' : ''} ${
          variant === VariantInputs.Checkbox
            ? `flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border border-solid md:h-6 md:w-6 ${
                isChecked ? 'border-whiteBase bg-accentBase' : 'border-accentBase bg-whiteBase'
              }`
            : ''
        }`}
      >
        {variant === VariantInputs.Checkbox ? (
          <SvgIcon
            svgName='icon-check'
            size={ICON_SIZES.xsIcon16}
            className={`${isChecked ? 'fill-whiteBase' : 'fill-none'}`}
          />
        ) : null}
        {hasIcon && (
          <div
            className={`${
              variant === VariantInputs.Header ? svgWrapperClass : 'left-3'
            } absolute top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center transition-all`}
          >
            <SvgIcon svgName={svgName} size={ICON_SIZES.smIcon20} className={`${svgFill}`} />
          </div>
        )}
        <input
          className={` ${inputGeometry} rounded-3xl border border-solid font-header text-small leading-mediumRelaxed tracking-bigWide outline-0 transition-colors focus:outline-0 md:text-base md:leading-moreRelaxed md:tracking-wide ${placeholderColor} ${inputBorder} ${inputBg} ${caretColor} ${textColor} ${checkboxStyles}`}
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
      <span className={`${!hasIcon && 'block'} font-medium text-accentBase`}>{children}</span>
    </label>
  );
};

export default UnverifiableInput;
