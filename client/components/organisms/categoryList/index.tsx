import React from 'react'

import { Container, Title, CategoryList as List } from './styles';
import * as T from '@root/types'
import CategoryItem from '@root/components/molecules/categoryItem/index';

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