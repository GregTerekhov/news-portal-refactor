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

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface IUpdateEmail {
  updatedEmail: string;
  currentPassword: string;
}

export interface IUpdatePasswordToValidate {
  newPassword: string;
  confirmPassword: string;
  oldPassword: string;
}
export interface IUpdatePasswordToSend {
  newPassword: string;
  oldPassword: string;
}

export interface IRecoveryPasswordRequest {
  recoveryEmail: string;
}

export interface IRecoveryPasswordChangeToValidate {
  changedPassword: string;
  confirmPassword: string;
}

export interface IRecoveryPasswordChangeToSend {
  changedPassword: string;
}

export interface IThirdPartyAuth {
  tokenAuth: string | null;
}

export type ITheme = string;
