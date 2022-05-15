export enum PostType {
  ARTICLE = 'article',
  PROJECT = 'project',
}

export interface Post {
  categories: Array<string>
  type: PostType
  clicks: string
  title: string
  description: string
  webLink?: string
  githubLink?: string
  postedBy: string
  createdAt: string
}