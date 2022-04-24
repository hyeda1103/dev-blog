import React, { useState, useEffect, ChangeEvent, FormEventHandler } from 'react'
import dynamic from 'next/dynamic';
import axios from 'axios'
import { GetServerSideProps } from 'next';

import Layout from '@/components/templates/layout';
import TwoCol from '@/components/templates/twoCol';
import InputWithLabel from '@/components/molecules/inputWithLabel';
import ErrorBox from '@/components/molecules/errorBox';
import TextEditor from '@/components/molecules/textEditor';
import Button from '@/components/atoms/button';
import { getCookie } from '@/helpers/auth';
import * as T from '@/types/index';
import { API } from '../../../config';
import { ChoiceWrapper, CategoryLabel, CategoryList, InputWrapper, StyledForm, ChoiceContainer, Title, InputContainer } from './styles';
import Dropdown from '@/components/atoms/dropDown';

interface Props {
  user: T.Profile
  categoryList: Array<T.Category>
  token: string
}

interface Option {
  value: string
  label: string
}

function CreateLink({ user, categoryList, token }: Props) {
  const [formValues, setFormValues] = useState<T.CreatePostForm>({
    title: '',
    description: '',
    webLink: '',
    githubLink: '',
    categories: [],
    type: T.PostType.ARTICLE,
  })
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [options, setOptions] = useState<Array<Option>>();

  const { title, description, webLink, githubLink, categories, type } = formValues

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };
  
  // form validation handler
  const validate = (values: T.CreatePostForm) => {
    const errorRegisters: T.Object = {};

    if (!values.title) {
      errorRegisters.title = '제목을 입력해야 합니다';
    } 

    if (values.type === T.PostType.PROJECT && !values.githubLink) {
      errorRegisters.githubLink = 'github 링크를 입력해야 합니다';
    } 
    
    if (!values.description) {
      errorRegisters.description = '내용을 입력해야 합니다';
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

  const handleContent = (e: string) => {
    setFormValues({
      ...formValues,
      description: e,
    })
    setFormErrors({ ...formErrors, description: '' });
  }
  
  const create = async () => {
    console.table({title, githubLink, webLink, categories, type, token})
    try {
      const res = await axios.post(`${API}/post`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      setFormValues({
        title: '',
        description: '',
        githubLink: '',
        webLink: '',
        categories: [],
        type: T.PostType.ARTICLE,
      })
      setServerErrorMessage('')
      setSuccessMessage(`${res.data.title}가(이) 성공적으로 생성되었습니다`)
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
              label="Title"
              type="text"
              value={title}
              placeholder="링크 제목을 입력하세요"
              handleChange={handleChange}
              formErrors={formErrors}
            />
            <InputWithLabel
              id="githubLink"
              label="Github Link"
              type="text"
              value={githubLink}
              placeholder="소스코드가 저장된 github 링크를 입력하세요"
              handleChange={handleChange}
              formErrors={formErrors}
            />
            <InputWithLabel
              id="webLink"
              label="Website URL"
              type="text"
              value={webLink}
              placeholder="배포한 웹사이트 주소를 입력하세요"
              handleChange={handleChange}
              formErrors={formErrors}
            />
            <TextEditor
              id="description"
              label="Post"
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
  
  useEffect(() => {
    const selectOptions = categoryList.map((categoryItem: T.Category) => ({
      value: categoryItem._id,
      label: categoryItem.name,
    }))
    setOptions(selectOptions)
  }, [categoryList])

  const MultipleChoice = () => {
    return (
      <ChoiceContainer>
        <ChoiceWrapper>
          <CategoryLabel>Category</CategoryLabel>
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
          <CategoryLabel>Post Type</CategoryLabel>
          <CategoryList>
            <li>
              <input
                id="article"
                name="article"
                value="article"
                type="radio"
                onChange={handleChange("type")}
                checked={type === T.PostType.ARTICLE}
              />
              <label htmlFor="article">Article</label>
            </li>
            <li>
              <input
                id="project"
                name="project"
                value="project"
                type="radio"
                onChange={handleChange("type")}
                checked={type === T.PostType.PROJECT}
              />
              <label htmlFor="project">Project</label>
            </li>
            <li>
              <input
                id="googled"
                name="googled"
                value="googled"
                type="radio"
                onChange={handleChange("type")}
                checked={type === T.PostType.GOOGLED}
              />
              <label htmlFor="googled">Googled</label>
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

export default CreateLink