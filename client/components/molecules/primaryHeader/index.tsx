import Link from 'next/link'
import React from 'react'
import { Container, Inner, Logo } from './styles'

function PrimaryHeader() {
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>해다코</a>
          </Link>
        </Logo>
      </Inner>
    </Container>
  )
}

export default PrimaryHeader