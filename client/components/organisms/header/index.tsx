import useDarkMode from 'use-dark-mode'
import Link from 'next/link'

import { isAuth, logout } from '@/helpers/auth'
import { Container, Inner, SunIcon, MoonIcon, Logo, Nav, Item, SwitchMode, LinkIcon } from './styles'

export default function Navbar() {
  const darkmode = useDarkMode(true)
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>HYEDAKO</a>
          </Link>
        </Logo>
        <Nav>
          {
            isAuth() && isAuth().role === 'admin' && (
              <Item>
                <Link href="/admin">
                  <a>ADMIN</a>
                </Link>
              </Item>  
            )
          }
          {
            isAuth() ? (
              <Item>
                <a onClick={logout}>로그아웃</a>
              </Item>
            ) : (
              <Item>
                <Link href="/login">
                  <a>로그인</a>
                </Link>
              </Item>
            )
          }
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
