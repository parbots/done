import Head from 'next/head'
import Link from 'next/link'

import styles from '@styles/HomePage.module.css'

import { Footer } from '@components/footer'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Done</title>
                <meta name='description' content='Get stuff done.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <div className={styles.page}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>done</h2>

                    <nav className={styles.headerNav}>
                        <Link href='/signin' className={styles.headerNavLink}>Sign In</Link>
                        <Link href='/signup' className={styles.headerNavLink}>Sign Up</Link>
                    </nav>
                </header>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Get stuff <span className={styles.titleHighlight}>done</span>.
                    </h1>

                    <p className={styles.description}>Simple and efficient task management.</p>

                    <Link href='/signup' className={styles.link}>Get Started</Link>
                </main>

                <Footer />
            </div>
        </>
    )
}
