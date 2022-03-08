import fs from 'fs'
import path from 'path'
import Layout from '@/components/templates/layout'
import Post from '@/components/Post'
import { getAllPosts } from '@/lib/posts'
import matter from 'gray-matter'
import { Library, Bookshelf, ContentsHeader, ContentsList, CategoryTab } from '@/styles/home'
import Author from '@/components/Author'
import { getAllProjects } from './../../lib/projects';
import { ReactElement } from 'react'
import Project from './../../components/Project';

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

type Project = {
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
  projects: Project[]
  categoryName: string
  categories: string[]
}

export default function CategoryBlogPage({ posts, projects, categoryName, categories }: Props) {
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
            {projects.map((project, index) => (
              <Project key={index} post={project} />
            ))}
          </ContentsList>
        </Bookshelf>
        <Author categories={categories} />
      </Library>
    </Layout>
  )
}

export async function getStaticPaths() {
  const allPosts = fs.readdirSync(path.join('blog'))
  const allProjects = fs.readdirSync(path.join('project'))
  const allPostCategories = allPosts.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('blog', filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)
    
    return frontmatter.category.split(', ')
  }).flat()
  const allProjectCategories = allProjects.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('project', filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)
    
    return frontmatter.category.split(', ')
  }).flat()
  const categories = allPostCategories.concat(allProjectCategories)
  const paths = [...new Set(categories)].map((category) => ({
    params: { category_name: category },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { category_name } }: any) {
  const posts = getAllPosts()
  const projects = getAllProjects()
  // Get categories for sidebar
  const categories = posts.concat(projects).map((post) => post.frontmatter.category.split(', '))
  const uniqueCategories = [...new Set(categories.flat())].sort()
  // Filter posts by category
  const categorizedPosts = posts.filter((post) => post.frontmatter.category.split(', ').includes(category_name))
  const categorizedProjects = projects.filter((project) => project.frontmatter.category.split(', ').includes(category_name))
  return {
    props: {
      posts: categorizedPosts,
      projects: categorizedProjects,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  }
}
