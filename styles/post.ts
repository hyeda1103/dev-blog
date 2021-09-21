import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 4rem 1.5rem; 
  border: 1px solid ${({ theme }) => theme.text};
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding-bottom: 1rem;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.text};
`

export const Title = styled.h1`
  font-weight: 400;
`

export const Date = styled.div`
`

export const Tag = styled.span`
  padding: 3px 8px;
  display: inline-block;
  font-size: 13px;
  border: 1px solid ${({ theme }) => theme.text};
  cursor: pointer;

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 1px 1px ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.body};
  }
`

export const CoverImage = styled.img``

export const Contents = styled.div`
  padding: 1rem;
  word-break: keep-all;
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
