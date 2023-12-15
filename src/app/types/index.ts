export interface individualSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface individualSignInData {
  email: string;
  password: string;
}

export interface SignUpResponse {
  suceess: boolean;

  data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    verificationCode: string;
    isVerified: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}
