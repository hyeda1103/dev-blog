import { Schema } from 'mongoose';

export interface User {
  username: string
  name: string;
  email: string;
  hashed_password: string;
  salt: string;
  role: string;
  resetPasswordLink: string;
}
