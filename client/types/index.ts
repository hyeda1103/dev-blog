export interface Object {
  [key: string]: string
}

enum Role {
  subscriber = 'subscriber',
  admin = 'admin'
}

export interface Profile {
  _id: string
  username: string
  name: string
  email: string
  role: Role
  createdAt: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface TokenDecoded {
  name: string
  email: string
  password: string
  exp: number
  iat: number
}

export interface ForgotPasswordForm {
  email: string
}

export interface ResetPasswordForm {
  password: string
}

export interface CreateCategoryForm {
  name: string
  content: string
  formData: FormData | undefined
}