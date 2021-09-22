import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { NextApiRequest, NextApiResponse } from 'next'

const allPosts = fs.readdirSync(path.join('blog'))
const allProjects = fs.readdirSync(path.join('project'))

export default (req: NextApiRequest, res: NextApiResponse) => {
  let posts;
  let projects;
  if (process.env.NODE_ENV === 'production') {
    // @todo - fetch from cache
  } else {
    posts = allPosts.map((filename) => {
      const slug = filename.replace('.md', '')

      const markdownWithMeta = fs.readFileSync(path.join('blog', filename), 'utf-8')

      const { data: frontmatter } = matter(markdownWithMeta)
      return {
        slug,
        frontmatter,
      }
    })
    projects = allProjects.map((filename) => {
      const slug = filename.replace('.md', '')

      const markdownWithMeta = fs.readFileSync(path.join('project', filename), 'utf-8')

      const { data: frontmatter } = matter(markdownWithMeta)
      return {
        slug,
        frontmatter,
      }
    })
  }

  const results = posts?.filter(({ frontmatter: { title, excerpt, category } }) => title.toLowerCase().indexOf(req.query.q) != -1 || excerpt.toLowerCase().indexOf(req.query.q) != -1 || category.toLowerCase().indexOf(req.query.q) != -1)
    || projects?.filter(({ frontmatter: { title, excerpt, category } }) => title.toLowerCase().indexOf(req.query.q) != -1 || excerpt.toLowerCase().indexOf(req.query.q) != -1 || category.toLowerCase().indexOf(req.query.q) != -1)
  res.status(200).json(JSON.stringify({ results }))
}
