import styled from 'styled-components'
import { GoSearch } from 'react-icons/go'

export const Container = styled.form`
  position: relative;
  display: flex;
  width: 314.66px;
  height: 100%;
  flex-direction: column;
  align-items: center;
`

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 32px 0 24px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.text};
  outline: none;
  display: flex;
  justify-content: left;
  z-index: 19;
`

export const SearchIcon = styled(GoSearch)`
  position: absolute;
  right: 0.5rem;
  color: #121212;
  z-index: 19;
`
