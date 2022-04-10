import React, { useEffect, useCallback, useState } from 'react'
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import axios from 'axios'
import DOMPurify from "dompurify";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment';
import 'moment/locale/ko';

import { API } from '../../config'
import Layout from '@/components/templates/layout';
import * as T from '../../types/index'
import { Header, Title, TypeWrapper, TagBox, Container } from './styles';
import CategoryItem from '@/components/molecules/categoryItem';

interface Props {
  post: T.Post
}

function SinglePost({ post }: Props) {
  return (
    <Layout>
      <Container>
        <Header>
          <Title>{post.title}</Title>
          <TypeWrapper>
            {moment(post.createdAt).fromNow()}
          </TypeWrapper>
        </Header>
        <TagBox>
          {post.categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </TagBox>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
      </Container>
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