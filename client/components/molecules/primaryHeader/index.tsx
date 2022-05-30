import Link from 'next/link'
import React from 'react'

import SearchInput from '../searchInput'
import { Container, Inner, Item, Logo, Nav } from './styles'

function PrimaryHeader() {
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>해다코</a>
          </Link>
        </Logo>
        <Nav>
          <Item>
            <Link href="/daily-dev">
              <a>개발하는 일상</a>
            </Link>
          </Item>
          <Item>
            <Link href="/side-project">
              <a>사이드 프로젝트</a>
            </Link>
          </Item>
          <Item>
            <Link href="/about">
              <a>대하여</a>
            </Link>
          </Item>
          <SearchInput />
        </Nav>
      </Inner>
    </Container>
  )
}

export default PrimaryHeader