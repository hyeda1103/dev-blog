import React from 'react'
import Link from 'next/link';

import * as T from '@root/types';
import { Container } from './styles';

interface Props {
  category: T.Category
}

function CategoryItem({ category }: Props) {
  return (
    <Container key={category._id}>
      <Link href={`/categories/${category.slug}`} passHref>
        {category.name}
      </Link>
    </Container>
  )
}

export default CategoryItem