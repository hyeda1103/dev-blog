import { Container, Inner, Copyright } from '@/styles/footer'

export default function Footer() {
  return (
    <Container>
      <Inner>
        <Copyright>
          &copy;
          {new Date().getFullYear()} 고다혜
        </Copyright>
      </Inner>
    </Container>
  )
}
