import { Container, Inner, Copyright } from '@/styles/footer'
import Link from 'next/link';

export default function Footer() {
  return (
    <Container>
      <Inner>
        <Copyright>
          &copy;
          {new Date().getFullYear()} YEOLSIKO, Powered by{" "}
          <Link href='https://nextjs.org/'>
            <a>
              Next.js
            </a>
          </Link>
        </Copyright>
      </Inner>
    </Container>
  )
}
