import { GetServerSideProps } from 'next'
import axios from 'axios'
import Link from 'next/link';

import * as T from '@/types/index';
import { getCookie } from '@/helpers/auth';
import Layout from '@/components/templates/layout'
import { API } from './../../config';


interface Props {
  admin: T.Profile
}


const Admin = ({ admin }: Props) => {
  return (
    <Layout>
      <h1>어드민 대시보드</h1>
      <ul>
        <li>
          <Link href="admin/category/create">
            <a>카테고리 만들기</a>
          </Link>
        </li>
        <li>
          <Link href="admin/post/create">
            <a>
              새 글 포스팅하기
            </a>
          </Link>
        </li>
      </ul>
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