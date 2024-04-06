import type { InputLabel } from '..';

export type ToastVariant = 'non-interactive' | 'interactive';
export type ToastStatus = 'error' | 'success' | 'info';

export interface ToastMessage {
  title: string;
  description: string;
}

export interface AuthInputs {
  type: string;
  placeholder: string;
  labelName: string;
  errors?: string | undefined;
  label: InputLabel;
  ariaInvalid?: boolean | undefined;
  fieldValue?: string | undefined;
  autoFocus?: boolean;
  autofill?: string;
  disabled: boolean;
}

export interface SelectedDate {
  beginDate: string;
  endDate: string;
}

export type UpdateCredentialsInput = {
  type: string;
  placeholder: string;
  fieldValue: string;
  errors?: string | undefined;
  label: InputLabel;
  iconName: string;
  ariaInvalid?: boolean;
  autofill?: string;
};
