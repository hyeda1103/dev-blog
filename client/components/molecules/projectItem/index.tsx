import Link from 'next/link';
import React from 'react'
import axios from 'axios';

import * as T from '../../../types'
import { Details, Header, LinkIcon, Container, TagBox, Title, Footer, TypeWrapper, ClickIcon, ViewWrapper } from './styles';
import CategoryItem from '@/components/molecules/categoryItem/index';
import { API } from '../../../config';

interface Props {
  slug?: string
  link: T.Link
  allLinks: Array<T.Link>
  setAllLinks: any
}

function ProjectItem({ slug, link, allLinks, setAllLinks }: Props) {
  const loadUpdatedLinks = async () => {
    if (slug) {
      const res = await axios.post(`${API}/category/${slug}`, {
        skip: 0,
        limit: allLinks.length,
      })
      setAllLinks(res.data.links)
    } else {
      const res = await axios.get(`${API}/projects`)
      setAllLinks(res.data)
    }
  }

  const handleClick = async (linkId: T.Link['_id']) => {
    const res = await axios.put(`${API}/click-count`, { linkId })
    loadUpdatedLinks()
  }
  return (
    <Container>
      <Header>
        <Title>{link.title}</Title>
        <TypeWrapper>
          {link.type}
          {' '}
          {link.medium}
        </TypeWrapper>                      
      </Header>
      <Details>
        <Link href={link.url ?? '/'}>
          <a target="_blank" onClick={(e) => handleClick(link._id)}>
            <LinkIcon />{link.url}
          </a>
        </Link>
      </Details>
      <Footer>
        <TagBox>
          {link.categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </TagBox>
        <ViewWrapper>
          {link.clicks} clicks
          <ClickIcon />
        </ViewWrapper>          
      </Footer>
    </Container>
  )
}

export default ProjectItem
