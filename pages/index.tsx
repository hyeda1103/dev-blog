import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import { sortByDate } from '@/utils/index'

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
}

export default function HomePage({ posts }: Posts) {
  console.log(posts)
  return (
    <Layout>
      <h1>최근 포스트</h1>
      <div>
        {posts.map((post: Post, index: number) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link href="/blog">
        <a>모든 포스트들</a>
      </Link>
    </Layout>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })
  return {
    props: {
      posts: posts.sort(sortByDate).slice(0, 6),
    },
  }
}
