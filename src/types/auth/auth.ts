// export type UpdatePasswordRequiredToValidate = Required<IUpdatePassword>;

// type UpdatePasswordToSend = Omit<IUpdatePassword, 'confirmPassword'>;

// export type UpdatePasswordRequiredToSend = Required<UpdatePasswordToSend>;

// interface IRecoveryPasswordChange {
//   newPassword: string;
//   confirmPassword: string;
// }

// export type RecoveryPasswordChangeRequiredToValidate = Required<IRecoveryPasswordChange>;

// type RecoveryPasswordChangeToSend = Omit<IRecoveryPasswordChange, 'confirmPassword'>;

// export type RecoveryPasswordChangeRequiredToSend = Required<RecoveryPasswordChangeToSend>;

export interface IUpdatePassword {
  newPassword: string;
  confirmPassword: string;
  password: string;
}
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
