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

export interface CreatePostForm {
  title: string
  description: string
  webLink?: string
  githubLink?: string
  categories: Array<string>
  type: PostType
}

export enum PostType {
  ARTICLE = 'article',
  PROJECT = 'project',
  GOOGLED = 'googled'
}
export interface Post {
  _id: string
  title: string
  description: string
  webLink?: string
  githubLink?: string
  categories: Array<Category>
  type: PostType
  clicks: number
  postedBy: Profile['_id']  
  createdAt: string
}

export interface SelectOption {
  value: string
  label: string
}

export enum Step {
  TYPE = 'type',
  POST = 'post'
}