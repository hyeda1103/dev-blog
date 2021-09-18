import fs from 'fs'
import path from 'path'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import CategoryList from '@/components/CategoryList'
import { POSTS_PER_PAGE } from '@/config/index'
import { getTechPosts } from '@/lib/posts'
import { Container } from '@/styles/blogPage'

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
      <Container>
        <div>
          <div>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <CategoryList categories={categories} />
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

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
  const files = fs.readdirSync(path.join('posts'))

  const posts = getTechPosts()

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category.split(', ').toString().toLowerCase())
  const uniqueCategories = [...new Set(categories)].flat().map(category => category.toString())

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
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
