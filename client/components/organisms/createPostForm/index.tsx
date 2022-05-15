import React, { ChangeEvent, FormEventHandler, SetStateAction } from 'react'
import { ActionMeta } from 'react-select';

import InputWithLabel from '@/components/molecules/inputWithLabel';
import TextEditor from '@/components/molecules/textEditor';
import ErrorBox from '@/components/molecules/errorBox';
import SelectWithLabel from '@/components/molecules/selectWithLabel';
import Button from '@/components/atoms/button';
import { InputContainer, InputWrapper, StyledForm } from './styles';
import * as T from '@/types/index';

interface Props {
  token: string
  options: Array<T.SelectOption> | undefined;
  successMessage: string;
  serverErrorMessage: string;
  formValues: T.CreatePostForm;
  formErrors: T.Object;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
  handleContent: (e: string) => void;
  reset: () => void;
  setStep: (value: SetStateAction<T.Step>) => void;
}

function CreatePostForm({
  token,
  options,
  successMessage,
  serverErrorMessage,
  formValues,
  formErrors,
  handleSubmit,
  handleChange,
  handleSelect,
  handleContent,
  reset,
  setStep,
}: Props) {
  const { type, title, description, webLink, githubLink } = formValues;
  const handleClick = () => {
    reset();
    setStep(T.Step.TYPE);
  }

  const RequiredContent = (type: T.CreatePostForm['type']) => {
    switch (type) {
      case T.PostType.ARTICLE:
        return (
          <InputContainer>
            <StyledForm onSubmit={handleSubmit} noValidate>
              <InputWrapper>
                <InputWithLabel
                  id="title"
                  label="제목"
                  type="text"
                  value={title}
                  placeholder="제목을 입력하세요"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                {options && (
                  <SelectWithLabel
                    id="categories"
                    label="카테고리"
                    handleChange={handleSelect}
                    formErrors={formErrors}
                    options={options}
                  />
                )}
                <TextEditor
                  id="description"
                  label="포스트"
                  value={description}
                  theme="snow"
                  handleChange={handleContent}
                  formErrors={formErrors}
                />
                <ErrorBox
                  success={successMessage}
                  error={serverErrorMessage}
                />
              </InputWrapper>
              <Button disabled={!token}>
                POST
              </Button>
            </StyledForm>
          </InputContainer>
        )
      case T.PostType.PROJECT:
        return (
          <InputContainer>
            <StyledForm onSubmit={handleSubmit} noValidate>
              <InputWrapper>
                <InputWithLabel
                  id="title"
                  label="제목"
                  type="text"
                  value={title}
                  placeholder="제목을 입력하세요"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                {options && (
                  <SelectWithLabel
                    id="categories"
                    label="카테고리"
                    handleChange={handleSelect}
                    formErrors={formErrors}
                    options={options}
                  />
                )}
                <InputWithLabel
                  id="githubLink"
                  label="Github 링크"
                  type="text"
                  value={githubLink}
                  placeholder="소스코드가 저장된 github 링크를 입력하세요"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <InputWithLabel
                  id="webLink"
                  label="Website 주소"
                  type="text"
                  value={webLink}
                  placeholder="배포한 웹사이트 주소를 입력하세요"
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <TextEditor
                  id="description"
                  label="포스트"
                  value={description}
                  theme="snow"
                  handleChange={handleContent}
                  formErrors={formErrors}
                />
                <ErrorBox
                  success={successMessage}
                  error={serverErrorMessage}
                />
              </InputWrapper>
              <Button disabled={!token}>
                POST
              </Button>
            </StyledForm>
          </InputContainer>
        )
      default:
        break;
    }
  }

  return (
    <>
      <button onClick={handleClick}>이전</button>
      {RequiredContent(type)}
    </>
  );
}

export default CreatePostForm;
