import { GetServerSideProps } from 'next'
import axios from 'axios'

import Layout from '@root/components/templates/layout'
import { API } from '@root/config';
import * as T from '@root/types';
import PostList from '@root/components/organisms/postList';

interface Props {
  categories: Array<T.Category>
  posts: Array<T.Post>
}

function HomePage({ categories, posts }: Props) {
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const categoryList = await axios.get(`${API}/categories`)
    const postList = await axios.get(`${API}/posts`)
    return {
      props: {
        categories: categoryList.data,
        posts: postList.data
      }
    }
  } catch (error) {
    return {
      props:{},
    };
  }
}

export default HomePage