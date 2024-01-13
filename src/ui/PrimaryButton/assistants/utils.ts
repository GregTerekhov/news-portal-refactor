import { VariantButton } from 'types';

type ButtonStylesProps = {
  disabled?: boolean | undefined;
  width: string;
};

type Styles = {
  [key: string]: {
    buttonStyles: string;
  };
};

export const generateButtonStyles = ({ disabled, width }: ButtonStylesProps) => {
  const styles: Styles = {
    [VariantButton.Primary]: {
      buttonStyles: `w-full py-2 ${
        disabled ? 'cursor-default bg-disabledBase' : 'bg-accentBase hover:bg-accentAlt'
      }  rounded-[20px]`,
    },
    [VariantButton.Other]: {
      buttonStyles: `${width} max-lg:py-2.5 lg:py-2 border border-solid border-transparent dark:border-whiteBase rounded-[20px] ${
        disabled ? 'cursor-default bg-disabledBase' : 'bg-accentBase hover:bg-accentAlt'
      }`,
    },
    [VariantButton.Small]: {
      buttonStyles: `${width} rounded-[10px] border border-solid`,
    },
  };

  return styles;
};
