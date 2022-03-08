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
position: relative;
  z-index: 1;
`
export const ContentsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  position: relative;
  z-index: 3;
`

interface TabProps {
  isClicked: boolean
}

export const Tab = css<TabProps>`
  position: relative;
  padding: 3px 24px 6px;
  border: 1px solid ${({ theme }) => theme.text};
  bottom: -3px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${props => props.isClicked ? ({ theme }) => theme.body : ({ theme }) => theme.text };
  background-color: ${props => props.isClicked ? ({ theme }) => theme.text : ({ theme }) => theme.body };
  transform: ${({isClicked}) => isClicked ? 'translate(0, -3px)' : 'none'};
  border-bottom: none;
  overflow: hidden;

  &:focus {
    outline: 0;
  }

  &:hover {
    transform: translate(0, -3px);
  }
`

export const CategoryTab = styled.div`
  padding: 3px 24px 6px;
  bottom: -3px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;
  cursor: pointer;
  border-bottom: none;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
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
  display: flex;
  margin-left: auto;
`

export const Bookshelf = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
`