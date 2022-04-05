import styled, { css } from 'styled-components'
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { HiLink } from 'react-icons/hi'

export const Container = styled.header`
  position: fixed;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  z-index: 9;
  background-color: ${({ theme }) => theme.body};
  display: flex;
  align-items: center;
`

export const Inner = styled.div`
  width: 960px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 8px 0;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.p`
  a {
    font-size: 1rem;
  }
`

export const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Item = styled.div`
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  a {
    font-size: 16px;
  }
  &:last-child {
    padding-right: 0;
  }
`
export const SwitchMode = styled.div<StyleProps>`
  background-color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  cursor: pointer;
  transition: 0.1s ease;
`

interface StyleProps {
  darkmode: boolean;
}

const Icon = css`
  font-size: 17px;
  color: ${({ theme }) => theme.body};
  vertical-align: middle;
`;

export const SunIcon = styled(IoMdSunny)`
  ${Icon}
`

export const MoonIcon = styled(IoMdMoon)`
  ${Icon}
`

export const LinkIcon = styled(HiLink)`
  font-size: 17px;
  color: #fff;
  background-color: ${({ theme }) => theme.hyperlink.default};
  vertical-align: middle;
  padding: 6px;

  &:hover {
    color: ${({ theme }) => theme.hyperlink.contrast};
  }
`;