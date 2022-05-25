import React from 'react'

import { GuideWrapper, TitleWrapper, Title } from './styles'

interface Props {
  stepNumber: number
  title: string
  guideText: string
}

function StepGuide({ stepNumber, title, guideText }: Props) {
  return (
    <GuideWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      {guideText}
    </GuideWrapper>
  )
}

export default StepGuide
