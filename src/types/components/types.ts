import { InputLabel } from '..';

export type ToastVariant = 'non-interactive' | 'interactive';

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
}
