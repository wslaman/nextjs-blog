import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useRouter } from 'next/router'
import Date from '/components/date'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  Router.events.on('routeChangeStart', (...args) => {
    console.log('1.routeChangeStart->路由开始变化，参数为：', ...args)
  })

  Router.events.on('routeChangeComplete', (...args) => {
    console.log('2.routeChangeComplete->路由变化结束，参数为：', ...args)
  })
  //Next.js全部都用History模式
  Router.events.on('beforeHistoryChange', (...args) => {
    console.log('3.beforeHistoryChange，参数为：', ...args)
  })
  //路由发生错误时，404不算
  Router.events.on('routeChangeError', (...args) => {
    console.log('4.routeChangeError->路由发生错误，参数为：', ...args)
  })
  //Hash路由切换之前
  Router.events.on('hashChangeStart', (...args) => {
    console.log('5.hashChangeStart，参数为：', ...args)
  })
  //Hash路由切换完成
  Router.events.on('hashChangeComplete', (...args) => {
    console.log('6.hashChangeComplete，参数为：', ...args)
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <h1 className={styles.title}>
          Learn <Link href="/posts/first-post">
            <a>first post!</a>
          </Link>
        </h1>

        <button onClick={() => { Router.push('/posts/first-post') }}>first post!</button>
        <button onClick={() => {
          Router.push(
            {
              pathname: '/posts/[id]',
              query: { id: 'pre-rendering' },
            }
          )
        }}>pre-rendering!</button>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>

          <a href="http://localhost:3000/posts/first-post" className={styles.card}>
            <h2>First Post</h2>
          </a>
        </div> */}
      </main>

      <section className={utilStyles.headingMd}>...</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>



      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width="72" height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}