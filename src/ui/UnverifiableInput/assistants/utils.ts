import { VariantInputs } from 'types';

type UnverifiableInputStylesProps = {
  isMobile?: boolean | undefined;
  touched?: boolean | undefined;
  inputClass: {
    inputBorder: string;
    svgFill: string;
    caretColor: string;
    textColor: string;
    placeholderColor: string;
  };
};

interface Styles {
  [key: string]: {
    inputGeometry?: string;
    inputBorder?: string;
    inputBg?: string;
    svgWrapperClass?: string;
    svgFill?: string;
    caretColor?: string;
    textColor?: string;
    placeholderColor?: string;
    labelCheckbox?: string;
    checkboxStyles?: string;
  };
}

export const generateInputStyles = ({
  isMobile,
  touched,
  inputClass,
}: UnverifiableInputStylesProps) => {
  const inputStyles: Styles = {
    [VariantInputs.Header]: {
      inputGeometry: `md:w-48 lg:w-72 md:py-[5px] md:pl-11 md:pr-3 transition-transform transition-transform border border-solid w-173px ring-color-whiteBase outline-0 focus:border-whiteBase ${
        isMobile ? (touched ? 'translate-x-0  py-[5px] pl-11 pr-3' : 'translate-x-full  p-0') : ''
      }`,
      inputBorder: `${inputClass.inputBorder} focus:ring-0 focus:outline-0`,
      inputBg: 'bg-transparent',
      svgWrapperClass: `${touched ? 'left-3' : 'right-3'}`,
      svgFill: inputClass.svgFill,
      caretColor: inputClass.caretColor,
      textColor: inputClass.textColor,
      placeholderColor: inputClass.placeholderColor,
    },
    [VariantInputs.FilterServiceBlock]: {
      inputGeometry: 'w-full py-2 pl-11 pr-3',
      inputBorder: 'border-accentBase dark:border-greyBase',
      inputBg: 'bg-whiteBase dark:bg-darkBackground',
      svgFill: 'fill-accentBase',
      caretColor: 'caret-accentBase dark:caret-whiteBase',
      textColor: 'text-accentBase dark:text-whiteBase',
      placeholderColor: 'placeholder:text-darkBase/[.4] dark:placeholder:text-whiteBase/[.4]',
    },
    [VariantInputs.Checkbox]: {
      labelCheckbox: 'flex items-center cursor-pointer gap-x-4',
      checkboxStyles: 'sr-only',
    },
  };
  return inputStyles;
};
