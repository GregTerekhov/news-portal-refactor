export interface IUpdateEmail {
  updatedEmail: string;
  currentPassword: string;
}

export interface IUpdatePassword {
  newPassword: string;
  confirmPassword: string;
  oldPassword: string;
}

export interface UpdateCredentialResponse {
  code: number;
  message: string;
  newEmail: string;
}

export type UpdatePasswordRequiredToValidate = Required<IUpdatePassword>;

type UpdatePasswordToSend = Omit<IUpdatePassword, 'confirmPassword'>;

export type UpdatePasswordRequiredToSend = Required<UpdatePasswordToSend>;

interface IRecoveryPasswordRequest {
  recoveryEmail: string;
}

export type RecoveryPasswordRequestRequired = Required<IRecoveryPasswordRequest>;

interface IRecoveryPasswordChange {
  changedPassword: string;
  confirmPassword: string;
}

export type RecoveryPasswordChangeRequiredToValidate = Required<IRecoveryPasswordChange>;

type RecoveryPasswordChangeToSend = Omit<IRecoveryPasswordChange, 'confirmPassword'>;

export type RecoveryPasswordChangeRequiredToSend = Required<RecoveryPasswordChangeToSend>;

export interface IThirdPartyAuth {
  tokenAuth: string | null;
}

export type GoogleResponse = {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
};
