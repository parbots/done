
import styles from '@/styles/SigninPage.module.css'

import Head from 'next/head'

import { Header } from '@/components/header'

import { ButtonLink } from '@/components/buttonLink'
import { SigninForm } from '@/modules/auth/signinForm'

import { Footer } from '@/components/footer'

export default function SigninPage() {

    return (
        <>
            <Head>
                <title>Sign In</title>
                <meta name='description' content='Get stuff done.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <div className={styles.page}>
                <Header useSession={false}>
                    <ButtonLink href='/signup' text='Sign Up' />
                </Header>

                <main className={styles.main}>
                    <SigninForm />
                </main>

                <Footer />
            </div>
        </>
    );
};
