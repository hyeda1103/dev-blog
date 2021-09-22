import useDarkMode from 'use-dark-mode'
import Link from 'next/link'
import { Container, Inner, SunIcon, MoonIcon, Logo, Nav, Item, SwitchMode } from '@/styles/header'
import Search from './Search'

export default function Navbar() {
  const darkmode = useDarkMode(true)
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>열시고</a>
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
            <SwitchMode darkmode={darkmode.value} onClick={darkmode.toggle}>
              {darkmode.value ? <MoonIcon /> : <SunIcon />}
            </SwitchMode>
          </Item>
          <Item>
            <Search />
          </Item>
        </Nav>
      </Inner>
    </Container>
  )
}
