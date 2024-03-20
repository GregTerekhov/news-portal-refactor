import { ClickHandler, PrimaryButtonType, VariantButton } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

export interface IControlButtons {
  type: PrimaryButtonType;
  id?: string | undefined;
  variant: VariantButton;
  onHandleClick: ClickHandler;
  ariaLabel?: string | undefined;
  classNameButtons?: string | undefined;
  hasIcon: boolean;
  svgName?: string;
  svgSize?: keyof typeof ICON_SIZES;
  classNameIcon?: string | undefined;
  children?: string | undefined;
  disabled?: boolean;
}
