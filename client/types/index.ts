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
  content: any
  image: string | File | Blob | ProgressEvent<FileReader>
}

export interface Image {
  url: string
  key: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: Image
  content: string
}

export interface CreateLinkForm {
  title: string
  url: string
  categories: Array<string>
  type: string
  medium: string
}

export enum Type {
  FREE = 'free',
  Paid = 'paid'
}

export enum Medium {
  Video = 'video',
  Article = 'article'
}

export interface Link {
  _id: string
  title: string
  url: string
  slug: string
  categories: Array<Category>
  type: Type
  medium: Medium 
  clicks: number
  postedBy: Profile['_id']  
}

export interface Project {
  _id: string
  title: string
  url: string
  slug: string
  categories: Array<Category>
  type: Type
  medium: Medium 
  clicks: number
  postedBy: Profile['_id']  
}