import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from '@/components/Layout'
import CopyToClipboard from '@/components/CopyToClipboard'
import { useEffect } from 'react'
import marked from 'marked'
import Prism from 'prismjs'
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import {
  Container,
  Header,
  Date,
  Title,
  SubInfo,
  Keywords,
  Tag,
  CoverImage
} from '@/styles/post';
import RecommendedPost from '@/components/RecommendedPost'

type Post = {
  frontmatter: {
    author: string
    author_image: string
    category: string
    cover_image: string
    date: string
    excerpt: string
    title: string
    section: string
  }
  slug: string
}

type Props = Post & {
  content: string
  postsRecommended: any
}


export default function PostPage({ frontmatter: { section, title, category, date, cover_image }, content, postsRecommended }: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [])
  
  const mm = date.split(' ')[3].split(':')[1]
  const hh = date.split(' ')[3].split(':')[0]
  const MM = date.split(' ')[0]
  const DD = date.split(' ')[1].slice(0, date.split(' ')[1].length-1)
  const YYYY = date.split(' ')[2]

  return (
    <Layout title={title}>
      <Container>
        <Header>
          {section === 'tech' ? '개발' : 'dailyLife' ? '일상' : '프로젝트'}
          <Title>{title}</Title>
          <SubInfo>
            <Date>{YYYY}.{MM}.{DD} {hh}:{mm}</Date>
            <CopyToClipboard />
          </SubInfo>
        </Header>
        <Keywords>{category.split(', ').map((tag, index) => (
          <Link key={index} href={`/blog/category/${tag}`}>
            <Tag key={tag}>{tag}</Tag>
          </Link>
        ))}
        </Keywords>
        <CoverImage src={cover_image} alt="" />
        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </Container>
      <RecommendedPost posts={postsRecommended} />
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

export async function getStaticProps({ params: { slug } }: StaticProps) {
  const posts = getAllPosts()
  const markdownWithMeta = fs.readFileSync(path.join('blog', slug + '.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markdownWithMeta)
  const categories = frontmatter.category.split(', ')
  let postsWithSameCategories: any = [] 
  posts.forEach((post) => {
    categories.forEach((category: string) => {
      if (post.frontmatter.category.split(', ').includes(category) && post.frontmatter.slug !== slug) {
        postsWithSameCategories.push(post)
      }
    })
  }) 

  console.log(postsWithSameCategories)

  return {
    props: {
      frontmatter,
      content,
      postsRecommended: [...new Set(postsWithSameCategories)]
    },
  }
}
