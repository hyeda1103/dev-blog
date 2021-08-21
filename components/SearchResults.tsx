import Post from './Post'
import { Container } from '@/styles/searchResults'

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
      <div>
        <h2>{results.length}개의 검색결과</h2>
        {results.map((result, index) => (
          <Post key={index} post={result} compact={true} />
        ))}
      </div>
    </Container>
  )
}
