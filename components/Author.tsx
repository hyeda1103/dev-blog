import CategoryList from '@/components/CategoryList'

import { Container, Profile, GitHub, Tab, Email } from '@/styles/author'

type Posts = {
  categories: string[]
}

export default function Author({ categories }: Posts) {
  return (
    <Container>
      <CategoryList categories={categories} />
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
