import Link from 'next/link'

export default function CategoryList({ categories }) {
  return (
    <div>
      <h3>카테고리</h3>
      <ul>
        {categories.map((category, index) => (
          <Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
            <li>{category}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
