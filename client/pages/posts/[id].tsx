import React, { useEffect, useCallback, useState } from 'react'
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import axios from 'axios'
import DOMPurify from "dompurify";
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from '../../config'
import Layout from '@/components/templates/layout';
import TwoCol from '@/components/templates/twoCol';
import * as T from '../../types/index'
import { CategoryInfo, Details, Header, Profile, PostList, ImageWrapper } from './styles';
import PostItem from '@/components/molecules/postItem';

interface Props {
  post: T.Post
}

function SinglePost({ post }: Props) {
  console.log(post)
  return (
    <Layout>
      {post.title}
    </Layout>
  )
}

export default SinglePost

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { id } = query

  try {
    const res = await axios.get(`${API}/post/${id}`)
    return {
      props: {
        post: res.data,
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}