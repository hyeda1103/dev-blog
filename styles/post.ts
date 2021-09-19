import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 4rem 1.5rem; 
  border: 1px solid ${({ theme }) => theme.text};
`

export const Date = styled.div`
  text-align: right;
`

export const Tag = styled.span`
  padding: 3px 8px;
  background: #f2f2f2;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    margin-left: 1rem;
  }

  & + & {
    margin-left: 0.5rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`

export const CoverImage = styled.img``

export const Contents = styled.div`
  padding: 1rem;
  word-break: keep-all;
`

export const Title = styled.h1`
  font-family: 'KoPubWorld-Dotum-Bold';
  line-height: 2.0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid  ${({ theme }) => theme.text};
`

export const Keywords = styled.div`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin: 1rem 0;
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`
