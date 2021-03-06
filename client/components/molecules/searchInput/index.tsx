import { useRouter } from 'next/router'
import React, { useState, ChangeEvent, FormEventHandler } from 'react'
import { Form, Input } from './styles'

function SearchInput() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!keyword) return;
    router.push(`/search?keyword=${keyword}`)
  }
  return (
    <Form onSubmit={handleSubmit} autoComplete='off'>
      <Input 
        name='keyword'
        type='text'
        placeholder='검색어를 입력하세요'
        onChange={handleChange}
      />
    </Form>
  )
}

export default SearchInput