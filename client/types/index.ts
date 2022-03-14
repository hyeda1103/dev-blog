export interface Object {
  [key: string]: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface TokenDecoded {
  name: string
  email: string
  password: string
  exp: number
  iat: number
}