import Link from 'next/link';
import React from 'react'
import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import 'moment/locale/ko';

import * as T from '@root/types'
import CategoryItem from '@root/components/molecules/categoryItem/index';
import { API } from '@root/config';
import { Details, Header, Description, Container, TagBox, Title, Footer, TypeWrapper, ClickIcon, ViewWrapper } from './styles';
import getFirstSentence from '@root/helpers/getFirstSentence';

interface Props {
  slug?: string
  post: T.Post
  allPosts: Array<T.Post>
  setAllPosts: any
}

function PostItem({ slug, post, allPosts, setAllPosts }: Props) {
  const loadUpdatedLinks = async () => {
    if (slug) {
      const res = await axios.post(`${API}/category/${slug}`, {
        skip: 0,
        limit: allPosts.length,
      })
      setAllPosts(res.data.posts)
    } else {
      const res = await axios.get(`${API}/posts`)
      setAllPosts(res.data)
    }
  }

  const handleClick = async (postId: T.Post['_id']) => {
    const res = await axios.put(`${API}/click-count`, { postId })
    loadUpdatedLinks()
  }

  const text = getFirstSentence(post.description)
  return (
    <Link href={`/posts/${post._id}`}>
      <Container onClick={(e) => handleClick(post._id)}>
        <Header>
          <Title>{post.title}</Title>
          <TypeWrapper>
            {moment(post.createdAt).fromNow()}
          </TypeWrapper>                      
        </Header>
        <Details>
          <Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
        </Details>
        <Footer>
          <TagBox>
            {post.categories.map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))}
          </TagBox>
          <ViewWrapper>
            {post.clicks} clicks
            <ClickIcon />
          </ViewWrapper>          
        </Footer>
      </Container>
    </Link>
  )
}

export default PostItem
