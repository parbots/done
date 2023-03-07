import Head from 'next/head'
import Link from 'next/link'

import styles from '@styles/HomePage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Done</title>
                <meta name='description' content='Get stuff done.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <Header />

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Get stuff <span className={styles.titleHighlight}>done.</span>
                    </h1>

                    <Link href='/list' className={styles.link}>Get Started</Link>
                </main>

                <Footer />
            </div>
        </>
    )
}
