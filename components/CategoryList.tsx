import Link from 'next/link'
import { List, Item } from '@/styles/categoryList'

type Props = {
  categories: string[]
}

export default function CategoryList({ categories }: Props) {
  return (
    <List>
      {categories.map((category, index) => (
        <Link key={index} href={`/blog/category/${category}`}>
          <Item>{category}</Item>
        </Link>
      ))}
    </List>
  )
}
