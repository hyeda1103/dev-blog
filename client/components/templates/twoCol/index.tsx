import React from 'react'

import { GridLayout, MainCol, SubCol } from './styles';

interface Props {
  MainContent: React.ReactChild | React.ReactElement
  SubContent: React.ReactChildren | React.ReactElement
}

function TwoCol({ MainContent, SubContent }: Props) {
  return (
    <GridLayout reverse={false}>
      <MainCol>
        {MainContent}
      </MainCol>
      <SubCol>
        {SubContent}
      </SubCol>
    </GridLayout>
  )
}

export default TwoCol