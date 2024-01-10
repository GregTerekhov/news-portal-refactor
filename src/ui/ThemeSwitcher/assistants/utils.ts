import { VariantSwitcher } from '../ThemeSwitcher';

type SwitcherStylesProps = {
  isHomeActive?: boolean | undefined;
  enabled?: boolean | undefined;
  themeSwitcherClass: string;
};

interface Styles {
  [key: string]: {
    spacing?: string;
    shadow?: string;
    colorLeftLabel?: string;
    strokeLeftIcon?: string;
  };
}

export const generateSwitcherStyles = ({
  isHomeActive,
  enabled,
  themeSwitcherClass,
}: SwitcherStylesProps) => {
  const commonLabelClass = enabled ? 'text-greyBase' : 'text-accentAlt';
  const commonIconClass = enabled ? 'stroke-greyBase' : 'stroke-accentAlt';

  const styles: Styles = {
    [VariantSwitcher.Header]: {
      spacing: 'justify-end',
      shadow: isHomeActive ? themeSwitcherClass : '',
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
