import { useState, useEffect } from 'react'
import SearchResults from './SearchResults'
import { SearchBox, SearchInput, SearchIcon } from '@/styles/searchBox'

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
    <div>
      <SearchBox>
        <SearchInput type="search" name="search" id="search" value={searchTerm} placeholder="검색어를 입력하세요" onChange={(e) => setSearchTerm(e.target.value)} autoComplete="false" />
        <SearchIcon />
      </SearchBox>
      <SearchResults results={searchResults} />
    </div>
  )
}
