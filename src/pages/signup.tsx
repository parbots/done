
import styles from '@/styles/SignupPage.module.css'

import Head from 'next/head'

import { Header } from '@/components/header'
import { SigninLink } from '@/components/signinLink'

import { SignupForm } from '@/modules/auth/signupForm'

import { Footer } from '@/components/footer'

export default function SignupPage() {
    return (
        <>
            <Head>
                <title>Sign Up</title>
                <meta name='description' content='Get stuff done.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <div className={styles.page}>
                <Header useSession={false}>
                    <SigninLink />
                </Header>

                <main className={styles.main}>
                    <SignupForm />
                </main>

                <Footer />
            </div>
        </>
    );
};
