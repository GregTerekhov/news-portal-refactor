import { ClickHandler, PrimaryButtonType, VariantButton } from 'types';

export interface IControlButtons {
  type: PrimaryButtonType;
  id?: string | undefined;
  variant: VariantButton;
  onHandleClick: ClickHandler;
  ariaLabel?: string | undefined;
  classNameButtons?: string | undefined;
  hasIcon: boolean;
  svgName?: string;
  svgSize: number;
  classNameIcon?: string | undefined;
  children?: string;
  disabled?: boolean;
}
