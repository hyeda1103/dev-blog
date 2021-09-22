import fs from 'fs'
import path from 'path'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import Author from '@/components/Author'
import Project from '@/components/Project';
import { POSTS_PER_PAGE } from '@/config/index'
import { Library, Bookshelf, ContentsList } from '@/styles/blogPage'
import { getAllProjects } from '@/lib/projects';

type Post = {
  frontmatter: {
    author: string
    author_image: string
    category: string
    cover_image: string
    date: string
    excerpt: string
    title: string
    section: string
    website: string
    github_link: string
  }
  slug: string
}

type Props = {
  posts: Post[]
  numPages: number
  currentPage: number
  categories: string[]
}

export default function BlogPage({ posts, numPages, currentPage, categories }: Props) {
  return (
    <Layout>
      <Library>
        <Bookshelf>
          <Pagination currentPage={currentPage} numPages={numPages} />
          <ContentsList>         
            {posts.map((post, index) => (
              post.frontmatter.section === 'project'
                ? (<Project key={index} post={post} />)  
                : (<Post key={index} post={post} />)                
            ))}            
          </ContentsList> 
        </Bookshelf>
        <Author categories={categories} />
    </Library>
  </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('project'))
  const numPages = Math.ceil((files.length) / POSTS_PER_PAGE)

  let paths = []
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    })
  }
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
  const page = parseInt((params && params.page_index) || 1)
  const files = fs.readdirSync(path.join('project'))

  const posts = getAllProjects()

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category.split(', '))
  const uniqueCategories = [...new Set(categories.flat())].sort()

  const numPages = Math.ceil((files.length) / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)
  
  return {
    props: {
      posts: orderedPosts,      
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  }
}
