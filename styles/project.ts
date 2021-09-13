import styled from 'styled-components'


export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: 8px 24px;
  cursor: pointer;
`

export const Date = styled.span`
  font-size: 14px;
`

export const Tag = styled.span`
  padding: 1px 5px;
  margin-left: 4px;
  display: inline-block;
  font-size: 11px;
  border: 1px solid ${({ theme }) => theme.text};
`

export const Title = styled.div`
  font-size: 18px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid ${({ theme }) => theme.text};
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`
export const ReadMore = styled.div`
  position: relative;
  margin-top: auto;
  align-self: flex-end;
  font-size: 14px;
`

export const Abstract = styled.div`
  font-size: 13px;
  margin: 6px 0;
`

export const Category = styled.div`
`

export const Website = styled.p``