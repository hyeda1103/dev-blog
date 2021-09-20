import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index'

const posts = fs.readdirSync(path.join('blog'))

export function getDailyPosts() {
    const post = posts.map((filename) => {
    const slug = filename.replace('.md', '')
    
    const markdownWithMeta = fs.readFileSync(path.join('blog', filename), 'utf-8')
    
    const { data: frontmatter } = matter(markdownWithMeta)
    
    return {
      slug,
      frontmatter,
    }
  })

  return post.filter(p => p.frontmatter.section === 'dailyLife').sort(sortByDate)
}

export function getTechPosts() {
  const post = posts.map((filename) => {
    const slug = filename.replace('.md', '')
    
    const markdownWithMeta = fs.readFileSync(path.join('blog', filename), 'utf-8')
    
    const { data: frontmatter } = matter(markdownWithMeta)
    
    return {
      slug,
      frontmatter,
    }
  })

  return post.filter(p => p.frontmatter.section === 'tech').sort(sortByDate)
}

export function getAllPosts() {
  const post = posts.map((filename) => {
    const slug = filename.replace('.md', '')
    
    const markdownWithMeta = fs.readFileSync(path.join('blog', filename), 'utf-8')
    
    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })

  return post.sort(sortByDate)
}
