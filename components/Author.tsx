import { Container, Profile, Location, GitHub, Tab, Email } from '@/styles/author'
import Search from './Search'


export default function Author() {
  return (
    <Container>
      <Search />
      <Profile>
        <Email>
          이메일 <a href="mailto: dalgona92@gmail.com">
            dalgona92@gmail.com
          </a>
        </Email>
        <GitHub>
          깃헙 <a href="https://github.com/hyeda1103">
            https://github.com/hyeda1103
          </a>
        </GitHub>
      </Profile>
    </Container>
  )
}