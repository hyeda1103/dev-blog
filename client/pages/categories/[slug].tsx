import React, { useEffect, useState, useMemo } from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from '../../config'
import Layout from '@/components/templates/layout';
import * as T from '@/types/index'
import LinkItem from '@/components/molecules/postItem/index';
import { CategoryInfoWrapper, Details, Header, Profile, PostList, ImageWrapper } from './styles';

interface Props {
  slug: string
  category: T.Category
  posts: Array<T.Post>
  numOfPosts: number
  postsLimit: number
  postSkip: number
}

function SingleCategory({ slug, category, posts, numOfPosts, postsLimit, postSkip }: Props) {
  const [allPosts, setAllPosts] = useState<Array<T.Post>>(posts)
  const [limit, setLimit] = useState(postsLimit);
  const [skip, setSkip] = useState(postSkip)
  const [size, setSize] = useState(numOfPosts)

  useEffect(() => {
    setAllPosts(posts)
    setSkip(postSkip)
    setSize(numOfPosts)
    setLimit(postsLimit)
  }, [slug, posts, postSkip, numOfPosts, postsLimit])
  
  const categoryInfo = useMemo(() => (
    <CategoryInfoWrapper>{category.name}에 대한 {numOfPosts}개의 글이 있습니다</CategoryInfoWrapper> 
  ), [category.name, numOfPosts])
  
  const loadMore = async () => {
    let toSkip = skip + limit
    setSkip(toSkip)
    const res = await axios.post(`${API}/category/${slug}`, { skip: toSkip, limit })
    setAllPosts([...allPosts, ...res.data.posts])
    setSize(res.data.posts.length)
  }
  
  const postList = (() => {
    return (
      <InfiniteScroll
        dataLength={allPosts.length}
        next={loadMore}
        hasMore={size > 0 && size >= limit}
        loader={<></>}
        endMessage={<></>}
      >
        <PostList>
          {allPosts.map((post) => (
            <LinkItem
              key={post._id}
              slug={slug}
              post={post}
              allPosts={allPosts}
              setAllPosts={setAllPosts}
            />
          ))}
        </PostList>
      </InfiniteScroll>
    )
  })()
  return (
    <Layout>
      {categoryInfo}
      {postList}
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
      posts: res.data.posts,
      numOfPosts: all.data.posts.length,
      postsLimit: limit,
      postSkip: skip,
    }
  }
}