import styled, {css} from "styled-components";

export const Library = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  height: 100%;
`

export const ContentsHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 0.25rem;
`
export const ContentsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-left: 1px solid ${({ theme }) => theme.text};  
  border-right: 1px solid ${({ theme }) => theme.text};
  gap: 0.25rem;
`

interface TabProps {
  isClicked: boolean
}

export const Tab = css<TabProps>`
  padding: 8px 24px;
  border: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;
  cursor: pointer;
  color: ${props => props.isClicked ? ({ theme }) => theme.body : ({ theme }) => theme.text };
  background-color: ${props => props.isClicked ? ({ theme }) => theme.text : '#fff' };
  border-bottom: none;
`

export const TechTab = styled.div`
  ${Tab}
`

export const Operator = styled.div`
  ${Tab}
`

export const DailyTab = styled.div`
  ${Tab}
`

export const ProjectTab = styled.div`
  ${Tab}
`

export const Bookshelf = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
`