import React, { useState, useEffect } from 'react'

import * as T from '@/types/index'
import { PostList as List } from './styles';
import PostItem from '@/components/molecules/postItem';

interface Props {
  posts: Array<T.Post>
}

function PostList({ posts }: Props) {
  const [allPosts, setAllPosts] = useState<Array<T.Post>>([])
  
  useEffect(() => {
    setAllPosts(posts)
  }, [posts]) 

  return (
    <List>
      {allPosts?.length === 0 ? (
        <p>등록된 포스트가 없습니다</p>
      ) : allPosts?.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          allPosts={allPosts}
          setAllPosts={setAllPosts}
        />
      ))}
    </List>
  )
}

export default PostList