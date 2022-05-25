import Link from 'next/link';

import { Container, Inner, Copyright } from './styles'

export default function Footer() {
  return (
    <Container>
      <Inner>
        <Copyright>
          &copy;
          {new Date().getFullYear()} HYEDAKO, Powered by{" "}
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
