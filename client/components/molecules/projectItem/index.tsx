import Link from 'next/link';
import React from 'react'
import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import 'moment/locale/ko';

import * as T from '@root/types'
import { Details, Header, GitHubIcon, Container, TagBox, Title, Footer, Description, TypeWrapper, ClickIcon, ViewWrapper, LinkWrapper } from './styles';
import CategoryItem from '@root/components/molecules/categoryItem/index';
import { API } from '@root/config';

interface Props {
  slug?: string
  post: T.Post
  allPosts: Array<T.Post>
  setAllPosts: any
}

function ProjectItem({ slug, post, allPosts, setAllPosts }: Props) {
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
    <Link href={`/posts/${post._id}`} passHref>
      <Container onClick={(e) => handleClick(post._id)}>
        <Header>
          <Title>{post.title}</Title>
          <TypeWrapper>
            {moment(post.createdAt).fromNow()}
          </TypeWrapper>                      
        </Header>
        <Details>
          <LinkWrapper>
            <a href={post.githubLink} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />{post.githubLink}
            </a>
          </LinkWrapper>
          <Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
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

export default ProjectItem
