
import styles from '@/styles/AccountPage.module.css'

import Head from 'next/head'
import Link from 'next/link'

import { Header } from '@/components/header'
import { SignoutButton } from '@/components/signoutButton'

import { Footer } from '@/components/footer'

export default function AccountPage() {
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
                    <Link href='/list' className={styles.headerLink}>My List</Link>
                    <SignoutButton />
                </Header>

                <main className={styles.main}>
                    <h1>Account</h1>
                </main>

                <Footer />
            </div>
        </>
    );
};
