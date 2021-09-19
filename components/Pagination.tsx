import Link from 'next/link'
import { Container, PageList, PageIndex } from '@/styles/pagination'

type Props = {
  currentPage: number
  numPages: number
}

export default function Pagination({ currentPage, numPages }: Props) {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/blog/page/${currentPage - 1}`
  const nextPage = `/blog/page/${currentPage + 1}`

  return (
    <Container>
      <PageList>
        {!isFirst && (
          <Link href={prevPage}>
            <PageIndex>이전</PageIndex>
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <Link key={i + 1} href={`/blog/page/${i + 1}`}>
            <PageIndex>{i + 1}</PageIndex>
          </Link>
        ))}
        {!isLast && (
          <Link href={nextPage}>
            <PageIndex>다음</PageIndex>
          </Link>
        )}
      </PageList>
    </Container>
  )
}
