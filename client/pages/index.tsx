import { GetServerSideProps } from 'next'
import axios from 'axios'

import Layout from '@/components/templates/layout'
import { API } from './../config';
import * as T from '@/types/index';
import CategoryList from '@/components/organisms/categoryList';
interface Props {
  categories: Array<T.Category>
}

function HomePage({ categories }: Props) {
  
  return (
    <Layout>
      {categories && (
        <CategoryList categories={categories} />
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get(`${API}/categories`)
    return {
      props: {
        categories: res.data
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

export default HomePage