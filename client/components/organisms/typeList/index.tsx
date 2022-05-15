import React, { Dispatch, SetStateAction } from 'react'

import { Container, SelectList, SelectItem, ArrowIcon, NextIcon } from './styles';
import * as T from '@/types/index'
import StepGuide from '@/components/molecules/stepGuide';
import Button from '@/components/atoms/button';

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
      <StepGuide stepNumber={1} title='포스트 타입 정하기' guideText='작성하고자 하는 포스트 유형을 선택해주세요' />
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
