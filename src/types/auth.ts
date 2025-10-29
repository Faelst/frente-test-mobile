export type SignInResponse = {
  token: string;
  name: string;
  email: string;
};

export type SignUpResponse = {
  success: boolean;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
