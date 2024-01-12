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
