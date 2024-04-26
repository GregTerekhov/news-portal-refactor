import { VariantInputs } from 'types';

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

export const generateInputStyles = () => {
  const inputStyles: Styles = {
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
      labelCheckbox: 'cursor-pointer order-2',
      checkboxStyles: 'sr-only',
    },
  };
  return inputStyles;
};
