import styled from 'styled-components'


export const Contents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 630px;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.text};
  padding: 8px 24px;
`

export const Date = styled.span`
  font-size: 14px;
`

export const Tag = styled.span`
  padding: 3px 8px;
  margin-left: 4px;
  display: inline-block;
  background: #f2f2f2;
  font-size: 8px;
  border-radius: 5px;
  color: #040a3c;
`

export const Title = styled.div`
  font-size: 18px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 4px 0;
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

export const Abstract = styled.p`
  font-size: 13px;
`

export const Category = styled.div`
`