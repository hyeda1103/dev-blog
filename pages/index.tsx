import Link from 'next/link'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import { getPosts } from '@/lib/posts'

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
  return {
    props: {
      posts: getPosts().slice(0, 6),
    },
  }
}
