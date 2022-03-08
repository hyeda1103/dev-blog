import Link from 'next/link'
import { List, Item } from '@/styles/categoryList'

type Props = {
  categories: string[]
}

export default function CategoryList({ categories }: Props) {
  return (
    <List>
      {categories.sort().map((category, index) => (
        <Link key={index} href={`/category/${category}`}>
          <Item>{category}</Item>
        </Link>
      ))}
    </List>
  )
}
