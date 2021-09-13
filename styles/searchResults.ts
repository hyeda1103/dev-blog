import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-left: 1px solid ${({ theme }) => theme.text};  
  border-right: 1px solid ${({ theme }) => theme.text};
  gap: 0.25rem;
`
export const Result = styled.p`
  font-size: 15px;
  padding: 8px 24px 3px;
`