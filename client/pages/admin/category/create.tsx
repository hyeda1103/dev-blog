import { GetServerSideProps } from 'next'
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios'

import * as T from '@/types/index';
import { getCookie } from '@/helpers/auth';
import Layout from '@/components/templates/layout'
import { API } from '../../../config';
import ErrorBox from '@/components/molecules/errorBox';
import AuthForm from '@/components/templates/authForm';
import Button from '@/components/atoms/button';
import InputWithLabel from '@/components/molecules/inputWithLabel';
import { InputWrapper, StyledForm, Title } from './styles';
import FileWithLabel from '@/components/molecules/fileWithLabel';


interface Props {
  admin: T.Profile
  token: string
}


const CreateCategory = ({ admin, token }: Props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    content: "",
    formData: process.browser ? new FormData() : undefined,
  })
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('카테고리 생성');
  const [imageUploadText, setImageUploadText] = useState('이미지 업로드')
  
  const {
    name, content, formData
  } = formValues;
  
  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    const value = keyName === 'image' ? e.target.files[0] : e.target.value;
    const imageName = keyName === 'image' ? e.target.files[0].name : '이미지 업로드';
    if (formData) formData.set(keyName, value)
    setFormValues({ ...formValues, [keyName]: value });
    setImageUploadText(imageName)
  };
  
  // form validation handler
  const validate = (values: T.CreateCategoryForm) => {
    const errorRegisters: T.Object = {};

    if (!values.name) {
      errorRegisters.name = '카테고리 이름을 입력해야 합니다';
    }

    if (!values.content) {
      errorRegisters.content = '카테고리 설명을 입력해야 합니다';
    }

    if (values.formData === null) {
      errorRegisters.formData = '카테고리 이미지를 업로드해야 합니다';
    }
    return errorRegisters;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
    setButtonText('카테고리 생성 중...')
  };

  const create = async () => {
    try {
      const res = await axios.post(`${API}/category`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      setFormValues({
        name: '',
        content: '',
        formData: undefined
      })
      setButtonText('카테고리 생성 완료')
      setServerErrorMessage('')
      setSuccessMessage(`카테고리 ${res.data.name}이 성공적으로 생성되었습니다`)
      setIsSubmitting(false);
    } catch (err: any) {
      setButtonText('카테고리 생성')
      setServerErrorMessage(err.response.data.error)
      setIsSubmitting(false);
    }
  }
  
  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) create();
  }, [formErrors, isSubmitting]);

  const title = (
    <Title>
      카테고리 생성하기
    </Title>
  );

  const subTitle = (
    <p>새로운 카테고리를 만들고 포스트를 작성하세요</p>
  )

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="name"
          label="카테고리 이름"
          type="text"
          value={name}
          placeholder="카테고리 이름을 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <InputWithLabel
          id="content"
          label="카테고리 설명"
          type="text"
          value={content}
          placeholder="카테고리 설명을 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <FileWithLabel
          id="image"
          type="file"
          accept='image/*'
          label={imageUploadText}
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <ErrorBox success={successMessage} error={serverErrorMessage} />
      </InputWrapper>
      <Button>
        {buttonText}
      </Button>
    </StyledForm>
  );

  return (
    <Layout>
      <AuthForm
        title={title}
        subTitle={subTitle}
        form={form}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie('token', context.req)

  try {
    const res = await axios.get(`${API}/admin`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return {
      props: {
        admin: res.data,
        token
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }
}


export default CreateCategory