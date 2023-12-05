export interface ICurrentUser {
  userTheme: string;
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export type SignUpRequiredFields = Required<SignUpCredentials>;

type SignInCredentials = Omit<SignUpCredentials, 'name'>;

export type SignInRequiredFields = Required<SignInCredentials>;

export interface IUpdateEmail {
  updatedEmail: string;
  currentPassword: string;
}

interface IUpdatePassword {
  newPassword: string;
  confirmPassword: string;
  oldPassword: string;
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

export type ITheme = {
  updatedTheme: string;
};
