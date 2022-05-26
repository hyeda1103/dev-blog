import { GetServerSideProps } from 'next'
import axios from 'axios'

import { API } from '@root/config';
import * as T from '@root/types';
import PostList from '@root/components/organisms/postList';
import Section from '@root/components/organisms/section';
import CategoryList from '@root/components/organisms/categoryList';
import OneColumn from '@root/components/templates/oneColumn';

interface Props {
  categories: Array<T.Category>
  projectPosts: Array<T.Post>
  devPosts: Array<T.Post>
}

function HomePage({ categories, projectPosts, devPosts }: Props) {
  return (
    <OneColumn>
      <Section
        title='개발'
        contents={<PostList posts={devPosts} />}
      />
      <Section
        title='프로젝트'
        contents={<PostList posts={projectPosts} />}
      />
    </OneColumn>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const categoryList = await axios.get(`${API}/categories`)
    const postList = await axios.get(`${API}/posts`)
    const projectList = postList.data.filter((post: T.Post) => post.type === T.PostType.PROJECT)
    const devPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.ARTICLE)

    return {
      props: {
        categories: categoryList.data,
        devPosts: devPostList,
        projectPosts: projectList,
      }
    }
  } catch (error) {
    return {
      props:{},
    };
  }
}

export default HomePage