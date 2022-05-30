import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { API } from '@root/config'
import * as T from '@root/types'
import PostList from '@root/components/organisms/postList'

function SearchResultPage() {
  const router = useRouter()
  const { keyword } = router.query
  
  const [searchResult, setSearchResult] = useState<Array<T.Post>>([])
  const [errorMessage, setErrorMessage] = useState('')
  
  const fetchPostsByKeyword: (keyword: string) => void = async (keyword) => {
    try {
      const postList = await axios.get(`${API}/posts?keyword=${keyword}`)
      setSearchResult(postList.data)
    } catch (error) {
      setErrorMessage(`${error}`)
    }
  } 
  
  useEffect(() => {
    setSearchResult([])
    setErrorMessage('')
    if (!keyword) router.push('/')
    if (typeof keyword !== 'string') return;
    fetchPostsByKeyword(keyword)
  }, [keyword])
  
  return (
    <>
      {errorMessage && errorMessage}
      {searchResult?.map((post) => (
        <PostList posts={searchResult} />
      ))}
    </>
  )
}

export default SearchResultPage