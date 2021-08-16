import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '@/components/Layout'
import marked from 'marked'
import { GetStaticPropsContext } from 'next'

type Post = {
  slug: string
  content: string
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

export default function PostPage({ frontmatter: { title, category, date, cover_image, author, author_image }, content, slug }: Post) {
  return (
    <Layout title={title}>
      <Link href="/blog">뒤로</Link>
      <div>
        <div>
          <h1>{title}</h1>
          <span>{category}</span>
        </div>
        <img src={cover_image} alt="" />
        <div>
          <div>
            <img src={author_image} alt="" />
            <h4>{author}</h4>
          </div>
          <div>{date}</div>
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      content,
    },
  }
}
