import React from 'react'
import { GridLayout, MainCol, SubCol } from './styles';

interface Props {
  MainContent: React.ReactChild | React.ReactElement
  SubContent: React.ReactChildren | React.ReactElement
}

function TwoCol({ MainContent, SubContent }: Props) {
  return (
    <GridLayout reverse={false}>
      <SubCol>
        {SubContent}
      </SubCol>
      <MainCol>
        {MainContent}
      </MainCol>
    </GridLayout>
  )
}

export default TwoCol