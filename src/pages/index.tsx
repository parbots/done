import Head from 'next/head'

import styles from '@styles/HomePage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Done</title>
                <meta name="description" content="Get stuff done." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className={styles.page}>
                <Header />

                <main className={styles.main}>
                    <p>Main Content</p>
                </main>

                <Footer />
            </div>
        </>
    )
}
