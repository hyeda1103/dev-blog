import fs from 'fs'
import path from 'path'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import { getAllPosts } from '@/lib/posts'
import matter from 'gray-matter'
import CategoryList from '@/components/CategoryList'
import { Library, Bookshelf, ContentsHeader, ContentsList, CategoryTab } from '@/styles/home'
import Author from '@/components/Author'

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
      <Library>
        <Bookshelf>
          <ContentsHeader>
            <CategoryTab>
              {categoryName}에 대한 포스트
            </CategoryTab>
          </ContentsHeader>
          <ContentsList>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </ContentsList>
        </Bookshelf>
        {/* <div>
          <CategoryList categories={categories} />
        </div> */}
        <Author categories={categories} />
      </Library>
    </Layout>
  )
}

export async function getStaticPaths() {
  const techPosts = fs.readdirSync(path.join('posts/tech'))
  const techCategories = techPosts.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts/tech', filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)

    return frontmatter.category.split(', ')
  }).flat()
  const dailyPosts = fs.readdirSync(path.join('posts/dailyLife'))
  const dailyCategories = dailyPosts.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts/dailyLife', filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)

    return frontmatter.category.split(', ')
  }).flat()
  const allProjects = fs.readdirSync(path.join('posts/project'))
  const projectCategories = allProjects.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts/project', filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)

    return frontmatter.category.split(', ')
  }).flat()
  const paths = [...new Set(techCategories.concat(dailyCategories, projectCategories))].map((category) => ({
    params: { category_name: category },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getAllPosts()
  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category.split(', '))
  const uniqueCategories = [...new Set(categories.flat())].sort()
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
