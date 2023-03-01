import Head from 'next/head'

import styles from '@styles/HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Done</title>
        <meta name="description" content="Get stuff done." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      </main>
    </>
  )
}
