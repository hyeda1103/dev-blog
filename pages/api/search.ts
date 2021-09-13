import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { NextApiRequest, NextApiResponse } from 'next'

const dailyPosts = fs.readdirSync(path.join('posts/dailyLife'))
const techPosts = fs.readdirSync(path.join('posts/tech'))

export default (req: NextApiRequest, res: NextApiResponse) => {
  let posts;
  if (process.env.NODE_ENV === 'production') {
    // @todo - fetch from cache
  } else {
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
    posts = techPost.concat(dailyPost)
  }

  const results = posts?.filter(({ frontmatter: { title, excerpt, category } }) => title.toLowerCase().indexOf(req.query.q) != -1 || excerpt.toLowerCase().indexOf(req.query.q) != -1 || category.toLowerCase().indexOf(req.query.q) != -1)
  res.status(200).json(JSON.stringify({ results }))
}
