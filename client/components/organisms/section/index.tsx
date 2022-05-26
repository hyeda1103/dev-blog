import React, { ReactNode } from 'react'

import { Container, TitleWrapper } from './styles';

interface Props {
  title: string
  contents: ReactNode
}

function Section({ title, contents }: Props) {
  return (
    <Container>
      <TitleWrapper>{title}</TitleWrapper>
      {contents}
    </Container>
  )
}

export default Section