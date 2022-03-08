import Post from './Post'
import { Container, Result } from '@/styles/searchResults'

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
  results: Post[]
}

export default function SearchResults({ results }: Props) {
  if (results.length === 0) return <></>
  return (
    <Container>
      <Result>{results.length}개의 검색결과가 있습니다</Result>
      {results.map((result, index) => (
        <Post key={index} post={result} compact={true} />
      ))}
    </Container>
  )
}
