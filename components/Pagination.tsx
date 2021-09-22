import {useState} from 'react'
import Link from 'next/link'
import { Container, PageList, Pages, PageIndex } from '@/styles/pagination'

type Props = {
  currentPage: number
  numPages: number
}

export default function Pagination({ currentPage, numPages }: Props) {
  const [currPage, setCurrPage] = useState(1)
  
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/blog/page/${currentPage - 1}`
  const nextPage = `/blog/page/${currentPage + 1}`

  return (
    <Container>
      <PageList>
        {!isFirst && (
          <Link href={prevPage}>
            <PageIndex isClicked={false}>이전</PageIndex>
          </Link>
        )}
        <Pages>
        {Array.from({ length: numPages }, (_, i) => (
          <Link key={i + 1} href={`/blog/page/${i + 1}`}>
            <PageIndex isClicked={currentPage === i + 1}>{i + 1}</PageIndex>
          </Link>
        ))}
        </Pages>
        {!isLast && (
          <Link href={nextPage}>
            <PageIndex isClicked={false}>다음</PageIndex>
          </Link>
        )}
      </PageList>
    </Container>
  )
}
