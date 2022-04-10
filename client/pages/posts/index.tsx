import React, { useEffect, useCallback, useState } from 'react'
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import axios from 'axios'
import DOMPurify from "dompurify";
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from '../../config'
import Layout from '@/components/templates/layout';
import * as T from '../../types/index'
import { PostList } from './styles';
import LinkItem from '@/components/molecules/postItem/index';

interface Props {
  posts: Array<T.Post>
  numOfPosts: number
  postsLimit: number
  postSkip: number
}

function PostsList({ posts, numOfPosts, postsLimit, postSkip }: Props) {
  const [allPosts, setAllPosts] = useState<Array<T.Post>>(posts)
  const [limit, setLimit] = useState(postsLimit);
  const [skip, setSkip] = useState(postSkip)
  const [size, setSize] = useState(numOfPosts)

  useEffect(() => {
    setAllPosts(posts)
    setSkip(postSkip)
    setSize(numOfPosts)
    setLimit(postsLimit)
  }, [posts, postSkip, numOfPosts, postsLimit])
  
  // const loadMore = async () => {
  //   let toSkip = skip + limit
  //   setSkip(toSkip)
  //   const res = await axios.post(`${API}/posts`, { skip: toSkip, limit })
  //   console.log(res.data.posts)
  //   setAllPosts([...allPosts, ...res.data.posts])
  //   setSize(res.data.posts.length)
  // }
  
  return (
    <Layout>
      {/* <InfiniteScroll
        dataLength={allPosts.length}
        next={loadMore}
        hasMore={size > 0 && size >= limit}
        loader={<></>}
        endMessage={<></>}
      > */}
        <PostList>
          {allPosts.map((post) => (
            <LinkItem
              key={post._id}
              post={post}
              allPosts={allPosts}
              setAllPosts={setAllPosts}
            />
          ))}
        </PostList>
      {/* </InfiniteScroll> */}
    </Layout>
  )
}

export default PostsList

export const getServerSideProps: GetServerSideProps = async () => {
  let skip = 0
  let limit = 5
  
  try {
    const res = await axios.get(`${API}/posts`)
    
    return {
      props: {
        posts: res.data,
        numOfPosts: res.data.length,
        postsLimit: limit,
        postSkip: skip,
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
  
}