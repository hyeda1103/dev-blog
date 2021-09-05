import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.text};
`

export const Date = styled.span``

export const Tag = styled.span`
  padding: 3px 8px;
  background: #f2f2f2;
  font-size: 11px;
  border-radius: 5px;
  color: #040a3c;
`

export const Contents = styled.div`
  padding: 1rem;
`

export const Title = styled.h3``

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`
