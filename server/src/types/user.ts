export interface User {
  username: string
  name: string;
  email: string;
  hashed_password: string;
  salt: string;
  role: string;
  resetPasswordLink: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}
