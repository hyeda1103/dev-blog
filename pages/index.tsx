import Link from 'next/link'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import Author from '@/components/Author'
import { getPosts } from '@/lib/posts'
import { Library, Bookshelf } from '@/styles/home'

type Post = {
  frontmatter: {
    author: string
    author_image: string
    category: string
    cover_image: string
    date: string
    excerpt: string
    title: string
  }
  slug: string
}

type Props = {
  posts: Post[]
}

export default function HomePage({ posts }: Props) {
  return (
    <Layout>
      <Library>
        <Bookshelf>
          {posts.map((post: Post, index: number) => (
            <Post key={index} post={post} />
          ))}
        </Bookshelf>
        <Author />
      </Library>
      <Link href="/blog">
        <a>모든 포스트들 보고 싶어요?</a>
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
