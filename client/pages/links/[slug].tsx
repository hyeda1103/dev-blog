import React, { useCallback, useState } from 'react'
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import axios from 'axios'
import DOMPurify from "dompurify";
import moment from "moment";

import { API } from './../../config'
import Layout from '@/components/templates/layout';
import TwoCol from '@/components/templates/twoCol';
import * as T from '../../types/index'
import { CategoryInfo, Details, Header, Profile, LinkIcon, LinkItem, LinkList, Medium, TagBox, Title, Type, ImageWrapper, ResultWrapper, CategoryTag, PostedAt } from './styles';
import CategoryItem from '@/components/molecules/categoryItem';

interface Props {
  query: string
  category: T.Category
  links: Array<T.Link>
  numOfLinks: number
  linksLimit: number
  linkSkip: number
}

function SingleCategory({ query, category, links, numOfLinks, linksLimit, linkSkip }: Props) {
  const categoryInfo = () => {
    return (
      <CategoryInfo>
        <ImageWrapper>
          <Profile src={category.image.url} alt={category.name} />
        </ImageWrapper>
        <Header>
          <p>{category.name}</p>
        </Header>
        <Details>
          {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(category.content) }} />}
        </Details>
      </CategoryInfo>
    )
  }
  const linkList = useCallback(() => {
    return (
      <LinkList>
        <ResultWrapper>Total {numOfLinks} Links</ResultWrapper>
        {links.map((link) => (
          <LinkItem key={link._id}>
            <Header>
              <Title>{link.title}</Title>
              <TagBox>
                {link.categories.map((category) => (
                  <CategoryItem key={category._id} category={category} />
                ))}
              </TagBox>
            </Header>
            <Details>
              <Link href={link.url}>
                <a>
                  <LinkIcon />{link.url}
                </a>
              </Link>
              <PostedAt>{moment(link.postedBy).fromNow()}</PostedAt>
            </Details>
          </LinkItem>
        ))}
      </LinkList>
    )
  }, [links])
  return (
    <Layout>
      <TwoCol 
        MainContent={linkList()}
        SubContent={categoryInfo()}
      />
    </Layout>
  )
}

export default SingleCategory

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  let skip = 0
  let limit = 3
  const { slug } = query

  const res = await axios.post(`${API}/category/${slug}`, { slug, skip, limit })
  return {
    props: {
      query,
      category: res.data.category,
      links: res.data.links,
      numOfLinks: res.data.links.length,
      linksLimit: limit,
      linkSkip: skip,
    }
  }
}