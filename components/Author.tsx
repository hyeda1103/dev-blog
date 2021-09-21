import CategoryList from '@/components/CategoryList'

import { Container, Profile, LinkedInIcon, LinkedIn, GitHubIcon, GitHub, EmailIcon, Email } from '@/styles/author'

type Posts = {
  categories: string[]
}

export default function Author({ categories }: Posts) {
  return (
    <Container>
      <CategoryList categories={categories} />
      <Profile>
        <Email>
          <EmailIcon />
          <a href="mailto: dalgona92@gmail.com">
            dalgona92@gmail.com
          </a>
        </Email>
        <GitHub>
          <GitHubIcon />
          <a href="https://github.com/hyeda1103">
            https://github.com/hyeda1103
          </a>
        </GitHub>
        <LinkedIn>
          <LinkedInIcon />
          <a href="https://www.linkedin.com/in/dahye-ko-1103/">
            https://www.linkedin.com/in/dahye-ko-1103/
          </a>
        </LinkedIn>
      </Profile>
    </Container>
  )
}
