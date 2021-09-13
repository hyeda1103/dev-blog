import useDarkMode from 'use-dark-mode'
import Link from 'next/link'
import { Container, Inner, Logo, Nav, Item, SwitchMode } from '@/styles/header'

export default function Navbar() {
  const darkmode = useDarkMode(true)
  return (
    <Container>
      <Inner>
        <Logo>
          <Link href="/">
            <a>고다혜</a>
          </Link>
        </Logo>
        <Nav>
          <Item>
            <Link href="/blog">
              <a>블로그</a>
            </Link>
          </Item>
          <Item>
            <Link href="/about">
              <a>포트폴리오</a>
            </Link>
          </Item>
          <Item>
            <SwitchMode onClick={darkmode.toggle}>{darkmode.value ? '밝음' : '어둠'}</SwitchMode>
          </Item> 
        </Nav>
      </Inner>
    </Container>
  )
}
