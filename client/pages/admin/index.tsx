import { GetServerSideProps } from 'next'
import axios from 'axios'
import Link from 'next/link';

import * as T from '@root/types';
import { getCookie } from '@root/helpers/auth';
import Layout from '@root/components/templates/layout'
import { API } from '@root/config';
import { Container, SelectList, ArrowIcon } from './styles';


interface Props {
  admin: T.Profile
}


const Admin = ({ admin }: Props) => {
  return (
    <Layout>
      <Container>
        <SelectList>
          <li>
            <Link href="admin/category/create" passHref>
              <ArrowIcon />
              새로운 카테고리 만들기
            </Link>
          </li>
          <li>
            <Link href="admin/post/create" passHref>
              <ArrowIcon />
              새로운 포스팅하기
            </Link>
          </li>
        </SelectList>
      </Container>
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
        admin: res.data
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


export default Admin