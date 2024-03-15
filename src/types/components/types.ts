import { InputLabel } from '..';

export type ToastVariant = 'non-interactive' | 'interactive';
export type ToastStatus = 'error' | 'success' | 'info';

export interface ToastMessage {
  title: string;
  description: string;
}

export interface AuthInputs {
  type: string;
  placeholder: string;
  children: string;
  errors?: string | undefined;
  label: InputLabel;
  ariaInvalid?: boolean | undefined;
  fieldValue?: string | undefined;
  autoFocus?: boolean;
  autofill?: string;
}

export interface SelectedDate {
  beginDate: string;
  endDate: string;
}
