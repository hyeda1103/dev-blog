import { useState, useEffect, MouseEventHandler } from 'react'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { API } from '../../../config'
import Layout from '@/components/templates/layout';
import ErrorBox from '@/components/molecules/errorBox';
import Button from '@/components/atoms/button';
import * as T from '@/types/index'

const ActivateAccount = ({ router }: WithRouterProps) => {
  const [formValues, setFormValues] = useState({
    name: '',
    token: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('Activate Account')

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

  const handleClick: MouseEventHandler = async (e) => {
    e.preventDefault();
    setButtonText('Activating')
    try {
      const res = await axios.post(`${API}/register/activate`, {
        token,
      })
      setFormValues({
        name: '',
        token: '',
      })
      setSuccessMessage(res.data.message)
      setButtonText('Activated')
    } catch (err: any) {
      setServerErrorMessage(err.response.data.error)
      setButtonText('Activate Account')
    }
  }

  return (
    <Layout>
      계정 인증할 준비가 되었나요?
      <ErrorBox
        success={successMessage}
        error={serverErrorMessage}
      />
      <Button onClick={handleClick}>
        {buttonText}
      </Button>
    </Layout>
  )
}

export default withRouter(ActivateAccount)