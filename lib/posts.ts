import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index'

const dailyPosts = fs.readdirSync(path.join('posts/dailyLife'))
const techPosts = fs.readdirSync(path.join('posts/tech'))
const allProjects = fs.readdirSync(path.join('posts/project'))

export function getDailyPosts() {
  const posts = dailyPosts.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(path.join('posts/dailyLife', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })

  return posts.sort(sortByDate)
}

export function getTechPosts() {
  const posts = techPosts.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(path.join('posts/tech', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })

  return posts.sort(sortByDate)
}

export function getAllPosts() {
  const techPost = techPosts.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(path.join('posts/tech', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })
  const dailyPost = dailyPosts.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(path.join('posts/dailyLife', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })
  const project = allProjects.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(path.join('posts/project', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })

  return techPost.concat(dailyPost, project).sort(sortByDate)
}
