import styled, {css} from 'styled-components'

export const Container = styled.div`
  display: flex;
`

export const PageList = styled.ul`
  display: flex;
  width: 100%;
  gap: 0.25rem;
  position: relative;
  z-index: 1;
  justify-content: space-between;
`

export const Pages = styled.div`
  display: flex;
  gap: 0.25rem;
  position: relative;
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

export const PageIndex = styled.li<TabProps>`
  ${Tab}
  list-style: none;
`