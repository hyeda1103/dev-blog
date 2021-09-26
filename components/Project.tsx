import Link from 'next/link'
import {
  Info, Tag, Address, Contents, Title, Website, Brief, LinkIcon, GitHubIcon, LinesIcon, PublishedAt, Category, Abstract
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
    section: string
  };
  slug: string
}

type Props = {
  post: Project
}

export default function Project({ post }: Props) {
  return (
    <Link href={`/project/${post.slug}`}>
      <Contents>
        <Title>
            <a>
            {post.frontmatter.title}
            </a>          
          <PublishedAt>
            {post.frontmatter.date}
          </PublishedAt>   
        </Title>
        <Info>
          <Abstract>          
            <Link href={post.frontmatter.website}>              
              <a>
                <Website>
                  <LinkIcon />
                  <Address>{post.frontmatter.website}</Address>
                </Website>
              </a>
            </Link>
            <Link href={post.frontmatter.website}>              
              <a>
                <Website>
                  <GitHubIcon />
                  <Address>{post.frontmatter.github_link}</Address>
                </Website>
              </a>
            </Link>
            <Brief>
              <LinesIcon />
              {post.frontmatter.excerpt}
            </Brief>
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
        
      </Contents>
    </Link>
  )
}
