
import styles from '@/styles/SettingsPage.module.css'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { useEffect } from 'react'

import { useSessionContext } from '@supabase/auth-helpers-react'

import { Header } from '@/components/header'
import { SignoutButton } from '@/components/signoutButton'

import { ButtonLink } from '@/components/buttonLink'

import { Footer } from '@/components/footer'

export default function SettingsPage() {

    const router = useRouter();

    const { isLoading, session, error } = useSessionContext();

    // If no user is signed in, redirect to homepage
    useEffect(() => {
        if (!isLoading && !session && !error) router.push('/');
    }, [router, isLoading, session, error]);

    // If there is an error loading the session, show error page
    if (error) {
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
                        <SignoutButton />
                    </Header>

                    <main className={styles.main}>
                        <p className={styles.error}>{error.message}</p>
                    </main>

                    <Footer />
                </div>
            </>
        );
    }

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
                    <SignoutButton />
                </Header>

                {isLoading &&
                    <main className={styles.main}>
                        <p className={styles.loading}>Loading...</p>
                    </main>
                }

                {!isLoading && session &&
                    <main className={styles.main}>
                        <h1 className={styles.title}>Settings</h1>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Account</h2>

                        </section>
                    </main>
                }

                <Footer />
            </div>
        </>
    );
};
