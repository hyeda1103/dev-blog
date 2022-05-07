import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { Container, SelectList, SelectItem, ArrowIcon } from './styles';
import * as T from '@/types/index'
import StepGuide from '@/components/molecules/stepGuide';

interface Props {
  postTypes: Array<string>
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void
  setStep: Dispatch<SetStateAction<T.Step>>
  formValues: T.CreatePostForm
}

function TypeList({ postTypes, handleChange, setStep, formValues }: Props) {
  
  return (
    <>
      <Container>
        <StepGuide stepNumber={1} guide='작성하고자 하는 포스트 유형을 선택해주세요' />
        <SelectList>
          {postTypes.map((type) => (
            <SelectItem key={type} onClick={() => handleChange("type")} isSelected={formValues.type === type}>
              <ArrowIcon />{' '}{type}
            </SelectItem>
          ))}
        </SelectList>
      </Container>
      <button onClick={() => setStep(T.Step.POST)}>다음</button>
    </>
  )
}

export default TypeList
