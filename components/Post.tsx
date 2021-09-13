import Link from 'next/link'
import { Tag, Contents, Title, Category, Abstract } from '@/styles/card'

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
    <Link href={`/blog/${post.slug}`}>
      <Contents>
        <Title compact={compact}>
            <a>
            {post.frontmatter.title}
            </a>
          {!compact && <Category>
            {post.frontmatter.category.split(', ').map((tag) => (
              <Tag key={tag}>
                <Link href={`/blog/category/${tag}`}>
                  <a>{tag}</a>
                </Link>
              </Tag>
            ))}
          </Category>}
        </Title>
        {!compact && <Abstract>
          {post.frontmatter.excerpt}
        </Abstract>}
      </Contents>
    </Link>
  )
}
