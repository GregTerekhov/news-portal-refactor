import { VariantSwitcher } from 'types';

type SwitcherStylesProps = {
  enabled?: boolean | undefined;
};

interface Styles {
  [key: string]: {
    spacing?: string;
    colorLeftLabel?: string;
    strokeLeftIcon?: string;
  };
}

export const generateSwitcherStyles = ({ enabled }: SwitcherStylesProps) => {
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
