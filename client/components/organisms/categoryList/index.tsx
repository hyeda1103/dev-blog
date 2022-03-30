import React from 'react'

import * as T from '@/types/index'
import { Container, Title } from './styles';
import CategoryItem from '@/components/molecules/categoryItem/index';

interface Props {
  categories: Array<T.Category>
}

function CategoryList({ categories }: Props) {
  return (
    <Container>
      <Title>카테고리</Title>
      {categories && categories.map((category) => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </Container>
  )
}

export default CategoryList