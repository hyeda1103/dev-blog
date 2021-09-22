import {useState} from 'react'

import Layout from '@/components/Layout'
import Post from '@/components/Post'
import Author from '@/components/Author'
import { getAllPosts, getTechPosts, getDailyPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import { Library, ContentsHeader, ContentsList, TechTab, Operator, DailyTab, ProjectTab, Bookshelf } from '@/styles/home'
import Project from '@/components/Project';

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
  }
  slug: string
}

type Project ={
  frontmatter: {
    author: string
    author_image: string
    category: string
    cover_image: string
    date: string
    excerpt: string
    title: string
    website: string
    github_link: string
    section: string
  }
  slug: string
}

type Props = {
  allPosts: Post[],
  allProjects: Project[],
  NofProjects: number,
  techPosts: Post[],
  NofTechPosts: number,
  dailyPosts: Post[],
  NofDailyPosts: number,
  categories: string[]
}

export default function HomePage({ allPosts, allProjects, techPosts, NofTechPosts, dailyPosts, NofDailyPosts, NofProjects, categories }: Props) {
  const [genre, setGenre] = useState('tech')
  return (
    <Layout>
      <Library>
        <Bookshelf>
          <ContentsHeader>
            <TechTab onClick={() => setGenre('tech')} isClicked={genre === 'tech'}>개발({NofTechPosts})</TechTab>
            <Operator onClick={() => setGenre('all')} isClicked={genre === 'all'}>||</Operator>
            <DailyTab onClick={() => setGenre('daily')} isClicked={genre === 'daily'}>일상({NofDailyPosts})</DailyTab>
            <ProjectTab onClick={() => setGenre('project')} isClicked={genre === 'project'}>프로젝트({NofProjects})</ProjectTab>
          </ContentsHeader>
          <ContentsList>
            {genre === 'tech' && (
              techPosts.map((post: Post, index: number) => (
                <Post key={index} post={post} />
              ))
            )}
            {genre === 'all' && (
              allPosts.map((post: Post, index: number) => (
                <Post key={index} post={post} />
              ))
            )}
            {genre === 'daily' && (
              dailyPosts.map((post: Post, index: number) => (
                <Post key={index} post={post} />
              ))
              )}
            {genre === 'project' && (
              allProjects.map((post: Project, index: number) => (
                <Project key={index} post={post} />
              ))
            )}
          </ContentsList> 
        </Bookshelf>
        <Author categories={categories} />
      </Library>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category.split(', '))
  const uniqueCategories = [...new Set(categories.flat())].sort()

  return {
    props: {
      allProjects: getAllProjects().slice(0, 2),
      allPosts: getAllPosts().slice(0, 6),
      techPosts: getTechPosts().slice(0, 6),
      NofTechPosts: getTechPosts().length,
      dailyPosts: getDailyPosts().slice(0, 6),
      NofDailyPosts: getDailyPosts().length,
      NofProjects:  getAllProjects().length,
      categories: uniqueCategories,
    },
  }
}
