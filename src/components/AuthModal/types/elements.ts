export interface AuthInputs {
  type: string;
  placeholder: string;
  children: string;
  errors?: string | undefined;
  label: string;
  ariaInvalid?: boolean | undefined;
  fieldValue?: string | undefined;
}

export interface IAuthModalProps {
  passwordToken?: boolean;
}

export interface RecoveryInputsValues {
  newPassword: string;
  confirmPassword: string;
}
