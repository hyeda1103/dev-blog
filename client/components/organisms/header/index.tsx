import useDarkMode from 'use-dark-mode'
import Link from 'next/link'

import { isAuth, logout } from '@/helpers/auth'
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
            <Link href="/user/link/create">
              <a>링크 등록</a>
            </Link>
          </Item>
          <Item>
            <Link href="/project">
              <a>프로젝트</a>
            </Link>
          </Item>          
          {
            isAuth() && isAuth().role === 'admin' && (
              <Item>
                <Link href="/admin">
                  <a>{isAuth().name}</a>
                </Link>
              </Item>
            )
          }
          {
            isAuth() && isAuth().role === 'subscriber' && (
              <Item>
                <Link href="/user">
                  <a>{isAuth().name}</a>
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
