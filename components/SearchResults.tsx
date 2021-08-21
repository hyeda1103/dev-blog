import Post from './Post'
import { Container } from '@/styles/searchResults'

export default function SearchResults({ results }) {
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
