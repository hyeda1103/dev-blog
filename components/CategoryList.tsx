import Link from 'next/link'
import { Container, List, Item } from '@/styles/categoryList'

type Props = {
  categories: string[]
}

export default function CategoryList({ categories }: Props) {
  return (
    <Container>
      <h3>카테고리</h3>
      <List>
        {categories.map((category, index) => (
          <Link key={index} href={`/blog/category/${category}`}>
            <Item>{category}</Item>
          </Link>
        ))}
      </List>
    </Container>
  )
}
