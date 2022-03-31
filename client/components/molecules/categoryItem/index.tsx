import React from 'react'
import Link from 'next/link';

import * as T from '@/types/index';
import { Container } from './styles';

interface Props {
  category: T.Category
}

function CategoryItem({ category }: Props) {
  return (
    <Container key={category._id}>
      <Link href={`/links/${category.slug}`}>
        <a>{category.name}</a>
      </Link>
    </Container>
  )
}

export default CategoryItem