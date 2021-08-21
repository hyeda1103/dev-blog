import useDarkMode from 'use-dark-mode'
import Link from 'next/link'
import { Container, Inner, Logo, Nav, Item } from '@/styles/header'
import Search from './Search'

export default function Navbar() {
  const darkmode = useDarkMode(true)
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>열시로그</a>
          </Link>
        </Logo>
        <Search />
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
        </Nav>
        <button onClick={darkmode.toggle}>Switch Theme</button>
      </Inner>
    </Container>
  )
}
