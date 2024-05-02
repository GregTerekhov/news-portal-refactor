import { VariantSwitcher } from 'types';

type SwitcherStylesProps = {
  enabled?: boolean | undefined;
};

type CurrentStyles = {
  spacing?: string;
  colorLeftLabel?: string;
  strokeLeftIcon?: string;
};

interface Styles {
  [key: string]: CurrentStyles;
}

export const generateSwitcherStyles = ({ enabled }: SwitcherStylesProps): Styles => {
  const commonLabelClass = enabled ? 'text-greyBase' : 'text-accentAlt';
  const commonIconClass = enabled ? 'stroke-greyBase' : 'stroke-accentAlt';

  const styles: Styles = {
    [VariantSwitcher.Header]: {
      spacing: 'justify-end',
      colorLeftLabel: commonLabelClass,
      strokeLeftIcon: commonIconClass,
    },
    [VariantSwitcher.Footer]: {
      colorLeftLabel: enabled ? 'text-greyAlt' : 'text-whiteBase',
      strokeLeftIcon: enabled ? 'stroke-greyAlt' : 'stroke-whiteBase',
    },
    [VariantSwitcher.Modal]: {
      colorLeftLabel: commonLabelClass,
      strokeLeftIcon: commonIconClass,
    },
  };

  return styles;
};

export const getCommonLabelStyles = (
  isHomeActive: boolean,
  variant: VariantSwitcher,
  themeSwitcherTextClass: string,
): string =>
  `${
    isHomeActive && variant !== VariantSwitcher.Modal && themeSwitcherTextClass
  } font-header text-xl leading-tighter hg:text-3xl`;

export const getSwitchFieldStyles = (enabled: boolean): string =>
  `${
    enabled ? 'border-contrastWhite bg-accentBase' : 'border-accentBase bg-contrastWhite'
  } relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border transition-colors ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hg:h-6 hg:w-11`;

export const getSwitchSliderStyles = (enabled: boolean): string =>
  `${
    enabled ? 'translate-x-5 bg-contrastWhite' : 'translate-x-[1px] bg-accentBase'
  } pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg ring-0 transition ease-in-out hg:h-5 hg:w-5`;
