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

export interface IRecoveryPassword {
  recoveryEmail: string;
}
