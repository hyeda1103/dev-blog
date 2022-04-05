import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import { Main } from './styles'
import 'nprogress/nprogress.css'

interface Props {
  title?: string
  keywords?: string
  description?: string
  children: React.ReactNode
}

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeComplete", NProgress.done);

export default function Layout({ title, keywords, description, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
