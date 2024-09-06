export type LoginType = {
  email: string;
  password: string;
};

export type SignUpType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
};

export type ResetPasswordType = {
  newPassword: string;
  confirmNewPassword: string;
}

export type RequestResetPasswordType = {
  email: string;
}