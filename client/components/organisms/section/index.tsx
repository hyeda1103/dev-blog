import React, { ReactNode } from 'react'

import { Container, Header, TitleWrapper, Title, Logline } from './styles';

interface Props {
  title?: string
  link?: ReactNode
  logline?: string
  contents: ReactNode
}

function Section({ title, link, logline, contents }: Props) {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Title>
            {title}
          </Title>
          {link}
        </TitleWrapper>
        <Logline>
          {logline}
        </Logline>
      </Header>
      {contents}
    </Container>
  )
}

export default Section