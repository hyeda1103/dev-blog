import Link from 'next/link'

export default function Pagination({ currentPage, numPages }) {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/blog/page/${currentPage - 1}`
  const nextPage = `/blog/page/${currentPage + 1}`

  if (numPages === 1) return <></>

  return (
    <div>
      <ul>
        {!isFirst && (
          <Link href={prevPage}>
            <li>이전</li>
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`}>
            <li>{i + 1}</li>
          </Link>
        ))}
        {!isLast && (
          <Link href={nextPage}>
            <li>다음</li>
          </Link>
        )}
      </ul>
    </div>
  )
}
