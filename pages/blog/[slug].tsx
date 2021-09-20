import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from '@/components/Layout'
import { useEffect } from 'react'
import marked from 'marked'
import Prism from 'prismjs'
import {
  Container,
  Date,
  Title,
  Keywords,
  Tag,
  CoverImage
} from '@/styles/post';

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

type Props = Post & {
  content: string
}


export default function PostPage({ frontmatter: { title, category, date, cover_image }, content, slug }: Props) {
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [])

  return (
    <Layout title={title}>
      <Container>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Keywords>KEYWORDS {category.split(', ').map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        </Keywords>
        <CoverImage src={cover_image} alt="" />
        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('blog'))
  
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

type StaticProps = {
  params: {
    slug: string
  }
}

export async function getStaticProps({params: { slug }}: StaticProps) {  
  const markdownWithMeta = fs.readFileSync(path.join('blog', slug + '.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markdownWithMeta)
  return {
    props: {
      frontmatter,
      content,
    },
  }
}
