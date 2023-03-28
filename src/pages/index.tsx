
import styles from '@/styles/HomePage.module.css'

import Head from 'next/head'

import { Header } from '@/components/header'
import { SignoutButton } from '@/components/signoutButton'

import { ButtonLink } from '@/components/buttonLink'

import { Footer } from '@/components/footer'

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
                <Header>
                    <ButtonLink href='/list' text='My List' />
                    <ButtonLink href='/settings' text='Settings' />
                    <SignoutButton />
                </Header>

                <main className={styles.main}>
                    <section className={styles.heroSection}>
                        <h1 className={styles.heroTitle}>
                            Get stuff <span className={styles.heroTitleHighlight}>done</span>.
                        </h1>

                        <p className={styles.heroDescription}>Simple and efficient task management.</p>

                        <ButtonLink href='/signup' text='Get Started' />
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};
