import React, { useEffect, useCallback, useState } from 'react'
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import axios from 'axios'
import DOMPurify from "dompurify";
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from './../../config'
import Layout from '@/components/templates/layout';
import TwoCol from '@/components/templates/twoCol';
import * as T from '../../types/index'
import { CategoryInfo, Details, Header, Profile, LinkList, ImageWrapper } from './styles';
import LinkItem from '@/components/molecules/linkItem/index';

interface Props {
  slug: string
  category: T.Category
  links: Array<T.Link>
  numOfLinks: number
  linksLimit: number
  linkSkip: number
}

function SingleCategory({ slug, category, links, numOfLinks, linksLimit, linkSkip }: Props) {
  const [allLinks, setAllLinks] = useState<Array<T.Link>>(links)
  const [limit, setLimit] = useState(linksLimit);
  const [skip, setSkip] = useState(linkSkip)
  const [size, setSize] = useState(numOfLinks)

  useEffect(() => {
    setAllLinks(links)
    setSkip(linkSkip)
    setSize(numOfLinks)
    setLimit(linksLimit)
  }, [slug, links, linkSkip, numOfLinks, linksLimit])
  
  const categoryInfo = (() => {
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
  })()
  
  const loadMore = async () => {
    let toSkip = skip + limit
    setSkip(toSkip)
    const res = await axios.post(`${API}/category/${slug}`, { skip: toSkip, limit })
    console.log(res.data.links)
    setAllLinks([...allLinks, ...res.data.links])
    setSize(res.data.links.length)
  }
  
  const linkList = (() => {
    return (
      <InfiniteScroll
        dataLength={allLinks.length}
        next={loadMore}
        hasMore={size > 0 && size >= limit}
        loader={<div>로딩 중</div>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <LinkList>
          {allLinks.map((link) => (
            <LinkItem
              key={link._id}
              slug={slug}
              link={link}
              allLinks={allLinks}
              setAllLinks={setAllLinks}
            />
          ))}
        </LinkList>
      </InfiniteScroll>
    )
  })()
  return (
    <Layout>
      <TwoCol 
        MainContent={linkList}
        SubContent={categoryInfo}
      />
    </Layout>
  )
}

export default SingleCategory

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  let skip = 0
  let limit = 5
  const { slug } = query
  
  const all = await axios.post(`${API}/category/${slug}`)

  const res = await axios.post(`${API}/category/${slug}`, { skip, limit })
  return {
    props: {
      slug,
      category: res.data.category,
      links: res.data.links,
      numOfLinks: all.data.links.length,
      linksLimit: limit,
      linkSkip: skip,
    }
  }
}