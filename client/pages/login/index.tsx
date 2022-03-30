import React, { ChangeEvent, FormEventHandler, useEffect, useState } from 'react'
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import { authenticate, isAuth } from '@/helpers/auth';
import Button from '@/components/atoms/button';
import InputWithLabel from '@/components/molecules/inputWithLabel';
import AuthForm from '@/components/templates/authForm';
import Layout from '@/components/templates/layout'
import * as T from '@/types/index'
import {
  StyledForm,
  Title,
  DirectToWrapper,
  InputWrapper,
  ArrowForward,
} from './styles';
import ErrorBox from '@/components/molecules/errorBox';
import { API } from '../../config';

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('로그인')


  const {
    email, password,
  } = formValues;

  useEffect(() => {
    isAuth() && Router.push('/')
  }, [])

  const handleChange = (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: T.LoginForm) => {
    const errorRegisters: T.Object = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errorRegisters.email = '이메일 주소를 입력해야 합니다';
    } else if (!regex.test(values.email)) {
      errorRegisters.email = '올바르지 않은 이메일 주소입니다';
    }

    if (!values.password) {
      errorRegisters.password = '비밀번호를 입력해야 합니다';
    } else if (values.password.length < 4) {
      errorRegisters.password = '비밀번호는 적어도 네 글자 이상입니다';
    }
    return errorRegisters;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
    setButtonText('로그인 중...')
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
          email, password,
      })      
      setFormValues({
        email: '',
        password: '',
      })
      setButtonText('로그인 완료')
      setServerErrorMessage('')
      setSuccessMessage('성공적으로 로그인하였습니다')
      setIsSubmitting(false);
      authenticate(res, () => {
        if (isAuth()) {
          if (isAuth().role === 'admin') {
            Router.push('/admin')
          } else if (isAuth().role === 'subscriber') {
            Router.push('/user')
          }
        }
      })
    } catch (err: any) {
      setButtonText('로그인')
      setServerErrorMessage(err.response.data.error)
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) login()
  }, [formErrors, isSubmitting]);

  const title = (
    <Title>
      로그인하기
    </Title>
  );

  const form = (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <InputWrapper>
        <InputWithLabel
          id="email"
          label="이메일"
          type="email"
          value={email}
          placeholder="이메일 주소를 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <InputWithLabel
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <ErrorBox
          success={successMessage}
          error={serverErrorMessage}
        />
      </InputWrapper>
      <Button>
        {buttonText}
      </Button>
    </StyledForm>
  );

  const findPassword = (
    <Link href='/auth/password/forgot'>
      <a>
        <span>
          비밀번호 찾기
        </span>
        <ArrowForward />
      </a>
    </Link>
  )

  const directTo = (
    <DirectToWrapper>
      새로 오셨나요?
      {' '}
      <Link href="/register">
        <a>가입하기</a>
      </Link>
    </DirectToWrapper>
  );

  return (
    <Layout>
      <AuthForm
        title={title}
        form={form}
        findPassword={findPassword}
        directTo={directTo}
      />
    </Layout>
  );
}

export default Login