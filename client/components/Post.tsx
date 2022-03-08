import Link from 'next/link'
import { Main, Tag, Contents, Title, Category, Abstract, PublishedAt, Info } from '@/styles/card'
import Tippy from './Tippy';

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
    
  const minutes = new Date(post.frontmatter.date).getMinutes().toString().length === 1
    ?  `0${new Date(post.frontmatter.date).getMinutes().toString()}`
    : new Date(post.frontmatter.date).getMinutes().toString()
  const hours = new Date(post.frontmatter.date).getHours().toString().length === 1
    ?  `0${new Date(post.frontmatter.date).getHours().toString()}`
    : new Date(post.frontmatter.date).getHours().toString()
  const date = gapMonth
    ? `${new Date(post.frontmatter.date).getFullYear()}.${new Date(post.frontmatter.date).getMonth()+1}.${new Date(post.frontmatter.date).getDate()} ${hours}:${minutes}`
    : gapDate
      ? `${gapDate}일 전`
      : `${gapTime}시간 전`
  return (
    <Link href={`/blog/${post.slug}`}>
      <Contents compact={compact}>
        {!compact ? (
          <Main compact={compact}>
            <Title compact={compact}>
              {post.frontmatter.title}                      
            </Title>
            <PublishedAt compact={compact}>
              {date}
            </PublishedAt>
          </Main>
        ) : (
            <Main compact={compact}>
              <Tippy compact={compact} tooltipContent={post.frontmatter.excerpt}>
                <Title compact={compact}>
                  {post.frontmatter.title}                      
                </Title>
              </Tippy>
              <PublishedAt compact={compact}>
                {date}
              </PublishedAt>
            </Main>
        )}
        {!compact && (
          <Info>
            <Abstract>
              {post.frontmatter.excerpt}
            </Abstract>
            <Category>
              {post.frontmatter.category.split(', ').map((tag) => (
                <Tag key={tag}>
                  <Link href={`/category/${tag}`}>
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
