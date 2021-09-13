import fs from 'fs'
import path from 'path'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import { getPosts } from '@/lib/posts'
import matter from 'gray-matter'
import CategoryList from '@/components/CategoryList'

type Post = {
  slug: string
  frontmatter: {
    author: string
    author_image: string
    category: string
    cover_image: string
    date: string
    excerpt: string
    title: string
  }
}

type Posts = {
  posts: Post
  categoryName: string
  categories: string[]
}

export default function CategoryBlogPage({ posts, categoryName, categories }: Posts) {
  return (
    <Layout>
      <div>
        <div>
          <h1>{categoryName}에 대한 포스트</h1>
          <div>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div>
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)

    return frontmatter.category.split(', ')
  }).flat()
  const paths = [...new Set(categories)].map((category) => ({
    params: { category_name: category.toLowerCase() },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getTechPosts()
  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category)
  const uniqueCategories = [...new Set(categories)]
  // Filter posts by category
  const categoryPosts = posts.filter((post) => post.frontmatter.category.split(', ').includes(category_name))

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  }
}
