import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 0 0.5rem;
`

export const PostBlock = styled.div``

export const Library = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  height: 100%;
`

export const Bookshelf = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
`

export const ContentsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  position: relative;
  z-index: 3;
`