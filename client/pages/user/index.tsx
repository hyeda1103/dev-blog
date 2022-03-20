import axios from 'axios'

import * as T from '@/types/index';
import Layout from '@/components/templates/layout'
import { getCookie } from '@/helpers/auth';
import { API } from '../../config';
import { GetServerSideProps } from 'next';

interface Props {
  user: T.Profile
}

const User = ({ user }: Props) => {
  return (
    <Layout>{JSON.stringify(user)}</Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie('token', context.req)

  try {
    const res = await axios.get(`${API}/user`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return {
      props: {
        user: res.data
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

export default User