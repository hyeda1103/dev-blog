import { useState, useEffect, FormEventHandler } from 'react'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import jwt from 'jsonwebtoken'
import axios from 'axios'

import Layout from '@/components/templates/layout';
import ErrorBox from '@/components/molecules/errorBox';
import Button from '@/components/atoms/button';
import * as T from '@/types/index'
import AuthForm from '@/components/templates/authForm'
import { DirectToWrapper, InputWrapper, StyledForm, SubTitle, Title } from './styles'
import Link from 'next/link';
import { API } from '../../../config'

const ActivateAccount = ({ router }: WithRouterProps) => {
  const [formValues, setFormValues] = useState({
    name: '',
    token: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('계정 활성화')

  const { name, token } = formValues

  useEffect(() => {
    const token = router.query.id;
    if (token && typeof token === 'string') {
      const { name } = jwt.decode(token) as T.TokenDecoded
      setFormValues({
        name, token,
      })
    }
  }, [router])

  const handleClick: FormEventHandler = async (e) => {
    e.preventDefault();
    setButtonText('활성화하는 중...')
    try {
      const res = await axios.post(`${API}/register/activate`, {
        token,
      })
      setFormValues({
        name: '',
        token: '',
      })
      setSuccessMessage(res.data.message)
      setButtonText('활성화 완료')
    } catch (err: any) {
      setServerErrorMessage(err.response.data.error)
      setButtonText('계정 활성화')
    }
  }

  const title = (
    <Title>
      계정 활성화하기
    </Title>
  );

  const subTitle = (
    <SubTitle>아래 버튼을 클릭하고 계정 활성화를 완료할 수 있습니다</SubTitle>
  )

  const form = (
    <StyledForm onSubmit={handleClick} noValidate>
      <InputWrapper>
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

export default withRouter(ActivateAccount)