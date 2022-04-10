import Link from 'next/link';
import React from 'react'
import axios from 'axios';
import DOMPurify from 'dompurify';

import * as T from '../../../types'
import { Details, Header, LinkIcon, Container, TagBox, Title, Footer, TypeWrapper, ClickIcon, ViewWrapper } from './styles';
import CategoryItem from '@/components/molecules/categoryItem/index';
import { API } from '../../../config';

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
  return (
    <Link href={`/posts/${post._id}`}>
      <Container onClick={(e) => handleClick(post._id)}>
        <Header>
          <Title>{post.title}</Title>
          <TypeWrapper>
              {post.type}
          </TypeWrapper>                      
        </Header>
        <Details>
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            <LinkIcon />{post.url}
          </a>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
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
