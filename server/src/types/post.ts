export enum PostType {
  ARTICLE = 'article',
  PROJECT = 'project',
  GOOGLED = 'googled'
}

export interface Post {
  categories: Array<string>
  type: PostType
  clicks: string
  title: string
  description: string
  url?: string
  slug: string
  postedBy: string
}