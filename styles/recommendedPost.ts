import styled from 'styled-components'

export const Container = styled.section`
  margin: 5rem 0;
`

export const Posts = styled.div`
  display: flex;
  gap: 0.25rem;
  margin: 1rem 0;
`

export const Post = styled.div`
  width: 200px;
  height: 200px;
  padding: 8px 24px;
  border: 1px solid ${({ theme }) => theme.text};
`