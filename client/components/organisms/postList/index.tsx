import React, { useState, useEffect } from 'react'

import * as T from '@/types/index'
import { PostList as List } from './styles';
import PostItem from '@/components/molecules/postItem';
import ProjectItem from '@/components/molecules/projectItem';

interface Props {
  posts: Array<T.Post>
}

function PostList({ posts }: Props) {
  const [allPosts, setAllPosts] = useState<Array<T.Post>>([])
  
  useEffect(() => {
    setAllPosts(posts)
  }, [posts]) 

  const Item = (post: T.Post) => {
    switch (post.type) {
      case T.PostType.ARTICLE:
        return (
          <PostItem
            key={post._id}
            post={post}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
          />
        )
      case T.PostType.PROJECT:
        return (
          <PostItem
            key={post._id}
            post={post}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
          />
        )
      default:
        break;
    }
  }

  return (
    <List>
      {allPosts?.length === 0 ? (
        <p>등록된 포스트가 없습니다</p>
      ) : allPosts?.map((post) => {
        switch (post.type) {
          case T.PostType.ARTICLE:
            return (
              <PostItem
                key={post._id}
                post={post}
                allPosts={allPosts}
                setAllPosts={setAllPosts}
              />
            )
          case T.PostType.PROJECT:
            return (
              <ProjectItem
                key={post._id}
                post={post}
                allPosts={allPosts}
                setAllPosts={setAllPosts}
              />
            )
          default:
            break;
        }
      })}
    </List>
  )
}

export default PostList