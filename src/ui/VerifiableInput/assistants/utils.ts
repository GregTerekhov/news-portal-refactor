const commonGeometry = 'w-full py-2';
const commonBorderStyle = 'border-accentBase dark:border-greyBase';
const commonCaretStyle = 'caret-accentBase';

interface InputProperties {
  geometry: string;
  border: string;
  bg: string;
  caret: string;
  text: string;
  placeholderStyle?: string | undefined;
}

type VerifiableInputStyles = {
  [key: string]: InputProperties;
};

export const inputStyles: VerifiableInputStyles = {
  account: {
    geometry: `${commonGeometry} pl-11 pr-3`,
    border: `${commonBorderStyle}`,
    bg: 'bg-whiteBase',
    caret: `${commonCaretStyle}`,
    text: 'text-accentBase',
    placeholderStyle: 'placeholder:text-darkBase/[.4]',
  },
  auth: {
    geometry: `${commonGeometry} px-4 md:px-4`,
    border: `${commonBorderStyle}`,
    bg: 'bg-transparent',
    caret: `${commonCaretStyle} dark:caret-whiteBase`,
    text: 'text-darkBase dark:text-whiteBase',
  },
};
