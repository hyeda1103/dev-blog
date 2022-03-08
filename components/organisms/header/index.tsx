import useDarkMode from 'use-dark-mode'
import Link from 'next/link'

import { Container, Inner, SunIcon, MoonIcon, Logo, Nav, Item, SwitchMode } from './styles'

export default function Navbar() {
  const darkmode = useDarkMode(true)
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>해다고</a>
          </Link>
        </Logo>
        <Nav>          
          <Item>
            <Link href="/blog">
              <a>블로그</a>
            </Link>
          </Item>
          <Item>
            <Link href="/project">
              <a>프로젝트</a>
            </Link>
          </Item>
          <Item>
            <Link href="/login">
              <a>로그인</a>
            </Link>
          </Item>
          <Item>
            <Link href="/register">
              <a>회원가입</a>
            </Link>
          </Item>
          <Item>
            <SwitchMode darkmode={darkmode.value} onClick={darkmode.toggle}>
              {darkmode.value ? <MoonIcon /> : <SunIcon />}
            </SwitchMode>
          </Item>
        </Nav>
      </Inner>
    </Container>
  )
}
