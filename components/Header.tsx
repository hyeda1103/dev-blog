import useDarkMode from 'use-dark-mode'
import Link from 'next/link'
import { Container, Inner, Logo, Nav, Item, SwitchMode } from '@/styles/header'
import Search from './Search'

export default function Navbar() {
  const darkmode = useDarkMode(true)
  console.log(darkmode)
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>코알라</a>
          </Link>
        </Logo>
        <Nav>
          <Item>
            <Link href="/blog">
              <a>블로그</a>
            </Link>
          </Item>
          <Item>
            <Link href="/toon">
              <a>짧은 만화</a>
            </Link>
          </Item>
          <Item>
            <Link href="/about">
              <a>대하여</a>
            </Link>
          </Item>
          <Item>
            <SwitchMode onClick={darkmode.toggle}>{darkmode.value ? '어' : '밝'}</SwitchMode>
          </Item>
          <Item>
            <Search />
          </Item>
        </Nav>
      </Inner>
    </Container>
  )
}
