import fs from 'fs'
import path from 'path'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import { POSTS_PER_PAGE } from '@/config/index'
import { getAllPosts } from '@/lib/posts'
import { Library, Bookshelf, ContentsList } from '@/styles/blogPage'
import Author from '@/components/Author'

type Post = {
  frontmatter: {
    author: string
    author_image: string
    category: string
    cover_image: string
    date: string
    excerpt: string
    title: string
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
          <ContentsList>         
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </ContentsList> 
        <Pagination currentPage={currentPage} numPages={numPages} />
      </Bookshelf>
      <Author categories={categories} />
    </Library>
  </Layout>
  )
}

export async function getStaticPaths() {
  const techFiles = fs.readdirSync(path.join('posts/tech'))
  const dailyFiles = fs.readdirSync(path.join('posts/dailyLife'))
  const numPages = Math.ceil((techFiles.length+dailyFiles.length) / POSTS_PER_PAGE)

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
  const techFiles = fs.readdirSync(path.join('posts/tech'))
  const dailyFiles = fs.readdirSync(path.join('posts/dailyLife'))

  const posts = getAllPosts()

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category.split(', '))
  const uniqueCategories = [...new Set(categories.flat())].sort()

  const numPages = Math.ceil((techFiles.length + dailyFiles.length) / POSTS_PER_PAGE)
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
