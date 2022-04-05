import React, { useEffect, useCallback, useState } from 'react'
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import axios from 'axios'
import DOMPurify from "dompurify";
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from '../../config'
import Layout from '@/components/templates/layout';
import * as T from '../../types/index'
import { LinkList } from './styles';
import LinkItem from '@/components/molecules/linkItem/index';

interface Props {
  links: Array<T.Link>
  numOfLinks: number
  linksLimit: number
  linkSkip: number
}

function LinksList({ links, numOfLinks, linksLimit, linkSkip }: Props) {
  const [allLinks, setAllLinks] = useState<Array<T.Link>>(links)
  const [limit, setLimit] = useState(linksLimit);
  const [skip, setSkip] = useState(linkSkip)
  const [size, setSize] = useState(numOfLinks)

  useEffect(() => {
    setAllLinks(links)
    setSkip(linkSkip)
    setSize(numOfLinks)
    setLimit(linksLimit)
  }, [links, linkSkip, numOfLinks, linksLimit])
  
  // const loadMore = async () => {
  //   let toSkip = skip + limit
  //   setSkip(toSkip)
  //   const res = await axios.post(`${API}/links`, { skip: toSkip, limit })
  //   console.log(res.data.links)
  //   setAllLinks([...allLinks, ...res.data.links])
  //   setSize(res.data.links.length)
  // }
  
  return (
    <Layout>
      {/* <InfiniteScroll
        dataLength={allLinks.length}
        next={loadMore}
        hasMore={size > 0 && size >= limit}
        loader={<></>}
        endMessage={<></>}
      > */}
        <LinkList>
          {allLinks.map((link) => (
            <LinkItem
              key={link._id}
              link={link}
              allLinks={allLinks}
              setAllLinks={setAllLinks}
            />
          ))}
        </LinkList>
      {/* </InfiniteScroll> */}
    </Layout>
  )
}

export default LinksList

export const getServerSideProps: GetServerSideProps = async () => {
  let skip = 0
  let limit = 5
  
  try {
    const res = await axios.get(`${API}/links`)
    
    return {
      props: {
        links: res.data,
        numOfLinks: res.data.length,
        linksLimit: limit,
        linkSkip: skip,
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
  
}