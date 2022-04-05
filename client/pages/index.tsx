import { GetServerSideProps } from 'next'
import axios from 'axios'

import Layout from '@/components/templates/layout'
import { API } from './../config';
import * as T from '@/types/index';
import CategoryList from '@/components/organisms/categoryList';
import LinkList from '@/components/organisms/linkList';
import TwoCol from '@/components/templates/twoCol';
interface Props {
  categories: Array<T.Category>
  links: Array<T.Link>
}

function HomePage({ categories, links }: Props) {
  return (
    <Layout>
      <TwoCol
        MainContent={<LinkList links={links} />}
        SubContent={<CategoryList categories={categories} />}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const categoryList = await axios.get(`${API}/categories`)
    const linkList = await axios.get(`${API}/links`)
    return {
      props: {
        categories: categoryList.data,
        links: linkList.data
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