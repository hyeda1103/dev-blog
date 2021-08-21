import Link from 'next/link'
import Image from 'next/image'
import { Container, Date, Tag, Contents, Title, Info } from '@/styles/post'

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
      <Contents>
        <Info>
          <Date>{post.frontmatter.date}</Date>
          <Link href={`/blog/category/${post.frontmatter.category.toLowerCase()}`}>
            <Tag>{post.frontmatter.category}</Tag>
          </Link>
        </Info>
        <Link href={`/blog/${post.slug}`}>
          <a>
            <Title>{post.frontmatter.title}</Title>
          </a>
        </Link>
        <p>{post.frontmatter.excerpt}</p>
      </Contents>
      {!compact && (
        <Link href={`/blog/${post.slug}`}>
          <a>더 읽기</a>
        </Link>
      )}
    </Container>
  )
}
