import { Container, Inner, Copyright } from './styles'

export default function Footer() {
  return (
    <Container>
      <Inner>
        <Copyright>
          &copy;
          {new Date().getFullYear()} HYEDAKO
        </Copyright>
      </Inner>
    </Container>
  )
}
