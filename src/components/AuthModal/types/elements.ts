import type { InputLabel } from 'types';

export interface AuthInputs {
  type: string;
  placeholder: string;
  children: string;
  errors?: string | undefined;
  label: InputLabel;
  ariaInvalid?: boolean | undefined;
  fieldValue?: string | undefined;
}
