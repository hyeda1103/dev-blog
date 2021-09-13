import { useState, useEffect } from 'react'
import SearchResults from './SearchResults'
import { SearchBox, SearchInput } from '@/styles/searchBox'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === '') {
        setSearchResults([])
      } else {
        const res = await fetch(`api/search?q=${searchTerm}`)
        const { results } = await res.json()
        setSearchResults(results)
      }
    }
    getResults()
  }, [searchTerm])
  return (
    <>
      <SearchBox>
        <SearchInput name="search" id="search" value={searchTerm} placeholder="무슨 포스트가 보고 싶어요?" onChange={(e) => setSearchTerm(e.target.value)} autoComplete="false" />
      </SearchBox>
      <SearchResults results={searchResults} />
    </>
  )
}
