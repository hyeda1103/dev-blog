import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.text};
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
  margin: 0.5rem 0;
`

export const Title = styled.h3``

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`
