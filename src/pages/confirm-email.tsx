
import styles from '@/styles/ConfirmEmailPage.module.css'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'

import { useSessionContext } from '@supabase/auth-helpers-react'

import { Header } from '@/components/header'

import { Footer } from '@/components/footer'

export default function ConfirmEmailPage() {

    const router = useRouter();

    // get confirmation url from query parameter
    const searchParameters = useSearchParams();
    const confirmationURL = searchParameters.get('confirmation');

    const { isLoading, session } = useSessionContext();

    // redirect to homepage if user is already signed in
    useEffect(() => {
        if (!isLoading && session) router.push('/');
    }, [router, isLoading, session]);

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
                <Header useSession={false} />

                <main className={styles.main}>
                    {confirmationURL &&
                        <a href={confirmationURL} className={styles.link}>Confirm New Email</a>
                    }
                </main>

                <Footer />
            </div>
        </>
    );
};
