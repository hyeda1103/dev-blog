import { Container, Inner, Copyright } from '@/styles/footer'

export default function Footer() {
  return (
    <Container>
      <Inner>
        <Copyright>
          &copy;
          {new Date().getFullYear()} Built with{" "}
          <a href="https://nextjs.org/">Next.js</a>
        </Copyright>
      </Inner>
    </Container>
  )
}
