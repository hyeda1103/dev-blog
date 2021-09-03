import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

export const SearchBox = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 187px;
  height: 30px;
  padding: 0 0.5rem;
  border: 1px solid ${({ theme }) => theme.text};
  outline: none;
  display: flex;
  justify-content: left;
  z-index: 19;
`

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 0.5rem;
  color: #040a3c;
  z-index: 19;
`
