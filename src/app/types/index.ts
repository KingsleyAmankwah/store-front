export interface individualSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface businessSignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpResponse {
  suceess: boolean;
  message: string;
  data: {};
}

export interface SignInResponse {
  suceess: boolean;
  data: {};
  token: string;
  message: string;
}

export interface verifyEmailResponse {
  success: boolean;
  token: string;
  message: string;
  data: [];
}
