import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '@/components/Layout'
import marked from 'marked'

export default function PostPage({ frontmatter: { title, category, date, cover_image, author, author_image }, content, slug }) {
  return (
    <Layout title={title}>
      <Link href="/blog">뒤로</Link>
      <div>
        <div>
          <h1>{title}</h1>
          <span>{category}</span>
        </div>
        <img src={cover_image} alt="" />
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
