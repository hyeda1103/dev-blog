import styled from 'styled-components'
import { IoMdSunny, IoMdMoon } from "react-icons/io";

export const Container = styled.header`
  position: fixed;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  z-index: 9;
  background-color: ${({ theme }) => theme.body};
`

export const Inner = styled.div`
  width: 960px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  margin: 3px auto 0;
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
  a {
    font-size: 16px;
  }
  &:last-child {
    padding-right: 0;
  }
`
export const SwitchMode = styled.div<StyleProps>`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: 0.1s ease;
`

type StyleProps = {
  darkmode: boolean
}

export const SunIcon = styled(IoMdSunny)`
`

export const MoonIcon = styled(IoMdMoon)`
`