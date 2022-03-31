import React from 'react'

import * as T from '@/types/index'
import { Container, Title, CategoryList as List } from './styles';
import CategoryItem from '@/components/molecules/categoryItem/index';

interface Props {
  categories: Array<T.Category>
}

function CategoryList({ categories }: Props) {
  return (
    <Container>
      <Title>카테고리</Title>
      <List>
        {categories && categories.map((category) => (
          <CategoryItem key={category._id} category={category} />
        ))}
      </List>
    </Container>
  )
}

export default CategoryList