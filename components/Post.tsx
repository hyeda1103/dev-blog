import Link from 'next/link'
import { Tag, Contents, Title, Category, Abstract, PublishedAt, Info } from '@/styles/card'

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
  const gapMonth = new Date().getMonth() - new Date(post.frontmatter.date).getMonth()
  const gapDate = Math.abs(new Date().getDate() - new Date(post.frontmatter.date).getDate())
  const gapTime = new Date().getHours() - new Date(post.frontmatter.date).getHours()
  const date = gapMonth 
    ? `${new Date(post.frontmatter.date).getMonth()+1}월 ${new Date(post.frontmatter.date).getDate()}일, ${new Date(post.frontmatter.date).getFullYear()}년`
    : gapDate
      ? `${gapDate}일 전`
      : `${gapTime}시간 전`
  return (
    <Link href={`/blog/${post.slug}`}>
      <Contents compact={compact}>
        <Title compact={compact}>
          <a>
            {post.frontmatter.title}
          </a>   
          <PublishedAt compact={compact}>
            {date}
          </PublishedAt>          
        </Title>
        {!compact && (
          <Info>
            <Abstract>
              {post.frontmatter.excerpt}
            </Abstract>
            <Category>
              {post.frontmatter.category.split(', ').map((tag) => (
                <Tag key={tag}>
                  <Link href={`/blog/category/${tag}`}>
                    <a>{tag}</a>
                  </Link>
                </Tag>
              ))}
            </Category>            
          </Info>
        )}
      </Contents>
    </Link>
  )
}
