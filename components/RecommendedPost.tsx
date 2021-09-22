import {
  Container, Posts, Post
} from '@/styles/recommendedPost'

type Post = {
  frontmatter: {
    author: string
    author_image: string
    category: string
    cover_image: string
    date: string
    excerpt: string
    title: string
    section: string
  }
  slug: string
}

type Props = {
  posts: Post[]
}

export default function RecommendedPost({posts}: Props) {
  return (
    posts.length
      ? (
        <Container>
          <div>이런 글도 있어요</div>
          <Posts>
          {posts.map((post, index) => (
            <Post key={post.frontmatter.title}>            
              <div>
                {post.frontmatter.title}
              </div>
            </Post>
          ))}
          </Posts>
        </Container>
      )
      : (
        <div>없어요</div>
      )
  )
}
