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

export interface IUpdatePassword {
  newPassword: string;
  confirmPassword: string;
  oldPassword: string;
}

export interface IRecoveryPasswordRequest {
  recoveryEmail: string;
}

export interface IRecoveryPasswordChange {
  changedPassword: string;
}

export interface IThirdPartyAuth {
  tokenAuth: string;
}
