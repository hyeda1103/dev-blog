import React, { useState, useEffect, ChangeEvent, FormEventHandler, ChangeEventHandler } from 'react'
import axios from 'axios'

import Layout from '@/components/templates/layout';
import { API } from '../../../config';
import { ChoiceWrapper, CategoryLabel, CategoryList, InputWrapper, StyledForm, ChoiceContainer, Title, InputContainer } from './styles';
import InputWithLabel from '@/components/molecules/inputWithLabel';
import ErrorBox from '@/components/molecules/errorBox';
import Button from '@/components/atoms/button';
import * as T from '@/types/index';
import { GetServerSideProps } from 'next';
import { getCookie } from '@/helpers/auth';
import TwoCol from '@/components/templates/twoCol';

interface Props {
  user: T.Profile
  categoryList: Array<T.Category>
  token: string
}

function CreateProject({ user, categoryList, token }: Props) {
  const [formValues, setFormValues] = useState<T.CreateLinkForm>({
    title: '',
    url: '',
    categories: [],
    type: 'free',
    medium: 'article',
  })
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const { title, url, categories, type, medium } = formValues

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };
  
  // form validation handler
  const validate = (values: T.CreateLinkForm) => {
    const errorRegisters: T.Object = {};

    if (!values.title) {
      errorRegisters.title = '제목을 입력해야 합니다';
    } 
    
    if (!values.url) {
      errorRegisters.url = '링크를 입력해야 합니다';
    } 

    if (values.categories.length === 0) {
      errorRegisters.categories = '적어도 하나 이상의 카테고리를 선택해야 합니다'
    }    
    
    return errorRegisters;
  };
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };
  
  const create = async () => {
    console.table({title, url, categories, type, medium, token})
    try {
      const res = await axios.post(`${API}/project`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      setFormValues({
        title: '',
        url: '',
        categories: [],
        type: 'free',
        medium: 'article',
      })
      setServerErrorMessage('')
      setSuccessMessage(`링크 ${res.data.title}가(이) 성공적으로 생성되었습니다`)
      setIsSubmitting(false);
    } catch (err: any) {
      setServerErrorMessage(err.response.data.error)
      setIsSubmitting(false);
    }
  }
  

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) create()
  }, [formErrors, isSubmitting]);
  
  const form = () => {
    return (
      <InputContainer>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <InputWrapper>
            <InputWithLabel
              id="title"
              label="제목"
              type="text"
              value={title}
              placeholder="링크 제목을 입력하세요"
              handleChange={handleChange}
              formErrors={formErrors}
            />
            <InputWithLabel
              id="url"
              label="링크"
              type="text"
              value={url}
              placeholder="url를 입력하세요"
              handleChange={handleChange}
              formErrors={formErrors}
            />
            <ErrorBox
              success={successMessage}
              error={serverErrorMessage}
            />
          </InputWrapper>
          <Button disabled={!token}>
            링크 등록
          </Button>
        </StyledForm>
      </InputContainer>
    );
  } 

  const handleToggle = (categoryId: T.Category['_id']) => (e: ChangeEvent) => {
    const clicked = categories.indexOf(categoryId)
    const copyOfCategories = [...categories]

    const newCategories = clicked === -1 ? copyOfCategories.concat([categoryId]) : copyOfCategories.filter((id) => id !== categoryId)
    setFormValues({
      ...formValues,
      categories: newCategories
    })
    setFormErrors({
      ...formErrors,
      categories: '',
    })
  }

  const MultipleChoice = () => {
    return (
      <ChoiceContainer>
        <ChoiceWrapper>
          <CategoryLabel>카테고리</CategoryLabel>
          <CategoryList>
            {categoryList && categoryList.map((category) => (
              <li key={category._id}>
                <input
                  id={category._id}
                  name={category._id}
                  type="checkbox"
                  onChange={handleToggle(category._id)}
                />
                <label htmlFor={category._id}>{category.name}</label>
              </li>
            ))}
          </CategoryList>
          {formErrors?.categories && <ErrorBox error={formErrors?.categories} />}
        </ChoiceWrapper>
        <ChoiceWrapper>
          <CategoryLabel>비용</CategoryLabel>
          <CategoryList>
            <li>
              <input
                id="free"
                name="free"
                value="free"
                type="radio"
                onChange={handleChange("type")}
                checked={type === 'free'}
              />
              <label htmlFor="free">무료</label>
            </li>
            <li>
              <input
                id="paid"
                name="paid"
                value="paid"
                type="radio"
                onChange={handleChange("type")}
                checked={type === 'paid'}
              />
              <label htmlFor="paid">유료</label>
            </li>
          </CategoryList>
        </ChoiceWrapper>
        <ChoiceWrapper>
          <CategoryLabel>매체</CategoryLabel>
          <CategoryList>
            <li>
              <input
                id="article"
                name="article"
                value="article"
                type="radio"
                onChange={handleChange("medium")}
                checked={medium === 'article'}
              />
              <label htmlFor="article">글</label>
            </li>
            <li>
              <input
                id="video"
                name="video"
                value="video"
                type="radio"
                onChange={handleChange("medium")}
                checked={medium === 'video'}
              />
              <label htmlFor="video">동영상</label>
            </li>
          </CategoryList>
        </ChoiceWrapper>
      </ChoiceContainer>
    )
  }

  return (
    <Layout>
      <TwoCol
        MainContent={form()}
        SubContent={MultipleChoice()}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = getCookie('token', req)

  try {
    const user = await axios.get(`${API}/user`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    const category = await axios.get(`${API}/categories`)
    return {
      props: {
        user: user.data,
        categoryList: category.data,
        token
      }
    }
  } catch (error) {
    return {
      props: {},
    };
  }
}



export default CreateProject