import Link from 'next/link'
import {
  Date, Tag, Contents, Title, Website, ReadMore, Category, Abstract
} from '@/styles/project'

type Project = {
  frontmatter: {
    author: string
    author_image: string
    category: string
    cover_image: string
    date: string
    excerpt: string
    title: string
    website: string
    github_link: string
  };
  slug: string
}

type Props = {
  post: Project
}

export default function Project({ post }: Props) {
  return (
    <Link href={`/portfolio/${post.slug}`}>
      <Contents>
        <Title>
            <a>
            {post.frontmatter.title}
            </a>
          <Category>
            {post.frontmatter.category.split(', ').map((tag) => (
              <Tag key={tag}>
                <Link href={`/blog/category/${tag}`}>
                  <a>{tag}</a>
                </Link>
              </Tag>
            ))}
          </Category>
        </Title>
        <Abstract>
          <Website>
            <a href={post.frontmatter.website}>
              {post.frontmatter.website}
            </a>
          </Website>
          {post.frontmatter.excerpt}
        </Abstract>
      </Contents>
    </Link>
  )
}
