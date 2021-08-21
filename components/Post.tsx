import Link from 'next/link'
import Image from 'next/image'
import { Container, Tag } from '@/styles/post'

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
  post: Post
  compact?: boolean
}

export default function Post({ post, compact }: Props) {
  return (
    <Container>
      {!compact && <Image src={post.frontmatter.cover_image} alt="" height={420} width={600} />}
      <span>{post.frontmatter.date}</span>
      <Tag>
        <Link href={`/blog/category/${post.frontmatter.category.toLowerCase()}`}>{post.frontmatter.category}</Link>
      </Tag>
      <div>
        <Link href={`/blog/${post.slug}`}>
          <a>{post.frontmatter.title}</a>
        </Link>
        <p>{post.frontmatter.excerpt}</p>
      </div>
      {!compact && (
        <>
          <div>
            <Link href={`/blog/${post.slug}`}>
              <a>더 읽기</a>
            </Link>
            <div>
              <Image src={post.frontmatter.author_image} alt="" height={40} width={40} />
              <h3>{post.frontmatter.author}</h3>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}
