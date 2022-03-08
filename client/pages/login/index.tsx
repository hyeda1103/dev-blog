import React, { useEffect, useState } from 'react'
import Link from 'next/link';
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
} from './styles';

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<T.Object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    name, email, password, confirmPassword,
  } = formValues;

  const handleChange = (keyName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setFormErrors({ ...formErrors, [keyName]: '' });
    setFormValues({ ...formValues, [keyName]: e.target.value });
  };

  // form validation handler
  const validate = (values: T.RegisterForm) => {
    const errorRegisters: T.Object = {};

    if (!values.name) {
      errorRegisters.name = '이름을 입력해야 합니다';
    }

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

    if (!values.confirmPassword) {
      errorRegisters.confirmPassword = '비밀번호 확인을 입력해야 합니다';
    } else if (values.password !== values.confirmPassword) {
      errorRegisters.confirmPassword = '비밀번호와 비밀번호 확인이 일치하지 않습니다';
    }

    return errorRegisters;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) {
      // register handling
      console.log('registered!')
    }
  }, [formErrors, isSubmitting, formValues]);

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
      </InputWrapper>
      <Button>
        로그인
      </Button>
    </StyledForm>
  );

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
        directTo={directTo}
      />
    </Layout>
  );
}

export default Register