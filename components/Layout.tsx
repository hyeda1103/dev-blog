import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { Main } from '@/styles/layout'

type Props = {
  title?: string
  keywords?: string
  description?: string
  children: React.ReactNode
}

export default function Layout({ title, keywords, description, children }: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/KoPubWorld-Dotum-Light.ttf"
          as="font"
          crossOrigin=""
          />
        <link
          rel="preload"
          href="/fonts/KoPubWorld-Dotum-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/KoPubWorld-Dotum-Medium.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
