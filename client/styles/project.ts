import styled from 'styled-components'
import { BsLink45Deg } from "react-icons/bs";
import { GoMarkGithub } from "react-icons/go";
import { IoBrowsersSharp } from 'react-icons/io5'

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.text};
  padding: 8px 24px;
  cursor: pointer;
  transition: ease .07s;
  background-color: ${({ theme }) => theme.body};

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => `2px 2px ${theme.text}`};
  }
`

export const PublishedAt = styled.div`
  font-size: 13px;
  display: flex;
  align-items: flex-start;
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

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 1px 1px ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.body};
  }
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
  display: grid;
  grid-template-columns: 3fr auto;
  gap: 1rem;
  font-size: 13px;
  margin: 6px 0;
  width: 100%;
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

export const Brief = styled.div`
  display: grid;
  grid-template-columns: 22px auto;
  align-items: flex-start;
  margin-top: 4px;
`

export const Category = styled.div`
`

export const Website = styled.div`
  display: grid;
  grid-template-columns: 22px auto;
  align-items: center;
`

export const LinkIcon = styled(BsLink45Deg)`
  font-size: 16px;
`

export const Address = styled.p`
  &:hover {
    color: ${({ theme }) => theme.text};
  }
`

export const GitHubIcon = styled(GoMarkGithub)`
  font-size: 14px;
`

export const LinesIcon = styled(IoBrowsersSharp)`
  font-size: 15px;
  padding-top: 2px;
`