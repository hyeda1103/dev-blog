import { GetServerSideProps } from 'next'
import { ChangeEvent, ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios'
import Resizer from 'react-image-file-resizer';

import * as T from '@root/types';
import { API } from '@root/config';
import { getCookie } from '@root/helpers/auth';
import Button from '@root/components/atoms/button';
import ErrorBox from '@root/components/molecules/errorBox';
import InputWithLabel from '@root/components/molecules/inputWithLabel';
import FileWithLabel from '@root/components/molecules/fileWithLabel';
import TextEditor from '@root/components/molecules/textEditor';
import AuthForm from '@root/components/templates/authForm';
import Layout from '@root/components/templates/layout'
import { InputWrapper, StyledForm, Title } from './styles';

interface Props {
  admin: T.Profile
  token: string
}


const CreateCategory = ({ admin, token }: Props) => {
  const [formValues, setFormValues] = useState<T.CreateCategoryForm>({
    name: "",
    content: "",
    image: '',
  })
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [imageUploadText, setImageUploadText] = useState('이미지 업로드')
  
  const {
    name, content, image
  } = formValues;
  
  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
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

    if (!values.image) {
      errorRegisters.image = '카테고리 이미지를 업로드해야 합니다';
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
      content: e,
    })
  }

  const handleImage: ChangeEventHandler<HTMLFormElement> = (e) => {
    let fileInput = false;
    if (e.target.files[0]) fileInput = true;
    setImageUploadText(e.target.files[0].name);
    setFormErrors({ ...formErrors, image: '' });
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        uri => {
          setFormValues({
            ...formValues,
            image: uri
          })
        },
        'base64'
      )
    }
  }

  const create = async () => {
    try {
      const res = await axios.post(`${API}/category`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      setFormValues({
        name: '',
        content: '',
        image: '',
      })
      setServerErrorMessage('')
      setSuccessMessage(`카테고리 ${res.data.name}가(이) 성공적으로 생성되었습니다`)
      setIsSubmitting(false);
    } catch (err: any) {
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
        <TextEditor
          id="content"
          label="카테고리 설명"
          value={content}
          theme="bubble"
          placeholder="카테고리 설명을 입력하세요"
          handleChange={handleContent}
          formErrors={formErrors}
        />
        <FileWithLabel
          id="image"
          type="file"
          accept='image/*'
          label={imageUploadText}
          handleChange={handleImage}
          formErrors={formErrors}
        />
        <ErrorBox success={successMessage} error={serverErrorMessage} />
      </InputWrapper>
      <Button>
        카테고리 생성
      </Button>
    </StyledForm>
  );

  return (
    <AuthForm
      title={title}
      subTitle={subTitle}
      form={form}
    />
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