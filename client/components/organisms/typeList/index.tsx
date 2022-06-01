import React, { Dispatch, SetStateAction } from 'react'

import * as T from '@root/types'
import StepGuide from '@root/components/molecules/stepGuide';
import Button from '@root/components/atoms/button';
import { Container, SelectList, SelectItem, ArrowIcon } from './styles';

interface Props {
  postTypes: Array<T.PostType>
  setStep: Dispatch<SetStateAction<T.Step>>
  formValues: T.CreatePostForm
  setFormValues: Dispatch<SetStateAction<T.CreatePostForm>>
}

function TypeList({ postTypes, setStep, formValues, setFormValues }: Props) {
  const handleClick = (type: T.PostType) => setFormValues({ ...formValues, type });
  return (
    <Container>
      <StepGuide
        stepNumber={1}
        title='포스트 타입 정하기'
        guideText='개발과 일상 (article), 프로젝트 (project) 중 무엇에 관한 포스트를 작성하고 싶나요?' />
      <SelectList>
        {postTypes.map((type) => (
          <SelectItem key={type} value={type} onClick={() => handleClick(type)} isSelected={formValues.type === type}>
            <ArrowIcon />{' '}{type}
          </SelectItem>
        ))}
      </SelectList>
      <Button disabled={formValues.type === undefined} onClick={() => setStep(T.Step.POST)}>
        글 쓰러 가기
      </Button>
    </Container>
  )
}

export default TypeList
