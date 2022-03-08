import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index'

const allProjects = fs.readdirSync(path.join('project'))

export function getAllProjects() {
  const post = allProjects.map((filename) => {
    const slug = filename.replace('.md', '')
    
    const markdownWithMeta = fs.readFileSync(path.join('project', filename), 'utf-8')
    
    const { data: frontmatter } = matter(markdownWithMeta)
    
  return {
      slug,
      frontmatter,
    }
  })

  return post.sort(sortByDate)
}