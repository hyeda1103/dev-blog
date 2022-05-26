import React from 'react'
import Link from 'next/link'
import useDarkMode from 'use-dark-mode';

import { isAuth, logout } from '@root/helpers/auth'
import { Container, Inner, Nav, Item, SwitchMode, SunIcon, MoonIcon } from './styles'

function Secondary() {
  const darkmode = useDarkMode(true)
  return (
    <Container>
      <Inner>
        <Nav>
          {
            isAuth() && isAuth().role === 'admin' && (
              <Item>
                <Link href="/admin">
                  <a>어드민</a>
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
          <SwitchMode darkmode={darkmode.value} onClick={darkmode.toggle}>
            {darkmode.value ? <MoonIcon /> : <SunIcon />}
          </SwitchMode>
        </Nav>
      </Inner>
    </Container>
  )
}

export default Secondary