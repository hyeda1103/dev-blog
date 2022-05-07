import React from 'react'
import { GuideWrapper, StepWrapper } from './styles'

interface Props {
  stepNumber: number
  guide: string
}

function StepGuide({ stepNumber, guide }: Props) {
  return (
    <GuideWrapper>
      <StepWrapper>
        {stepNumber}단계
      </StepWrapper>
      {guide}
    </GuideWrapper>
  )
}

export default StepGuide
