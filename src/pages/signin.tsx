
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import styles from '@styles/SigninPage.module.css'

import { Footer } from '@components/footer'

export default function SigninPage() {
    const router = useRouter();

    const supabase = useSupabaseClient();

    const [emailInputValue, setEmailInputValue] = useState<string>('');

    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setEmailInputValue(event.target.value);
    };

    const [passwordInputValue, setPasswordInputValue] = useState<string>('');

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setPasswordInputValue(event.target.value);
    };

    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('info');

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        setShowInfo(false);

        // Do nothing if either input is blank
        if (emailInputValue.trim() === '' || passwordInputValue.trim() === '') {
            return;
        }

        // Request signin from supabase server
        const { error } = await supabase.auth.signInWithPassword({
            email: emailInputValue.trim(),
            password: passwordInputValue,
        });

        // Show server signin errors
        if (error) {
            setInfoMessage(error.message);
            setShowInfo(true);

            return;
        }
        
        router.push('/list');
    };

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
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>done</h2>

                    <nav className={styles.headerNav}>
                        <Link href='/signup' className={styles.headerNavLink}>Sign Up</Link>
                    </nav>
                </header>

                <main className={styles.main}>
                    <form onSubmit={handleFormSubmit} className={styles.signinForm}>
                        <fieldset className={styles.emailFieldset}>
                            <label htmlFor='signinEmailInput' className={styles.emailLabel}>Email:</label>
                            <input
                                type='email'
                                id='signinEmailInput'
                                value={emailInputValue}
                                onChange={handleEmailInput}
                                className={styles.emailInput}
                            />
                        </fieldset>

                        <fieldset className={styles.passwordFieldset}>
                            <label htmlFor='signinPasswordInput' className={styles.passwordLabel}>Password:</label>
                            <input
                                type='password'
                                id='signinPasswordInput'
                                value={passwordInputValue}
                                onChange={handlePasswordInput}
                                className={styles.passwordInput}
                            />
                        </fieldset>

                        <section className={styles.infoSection}>
                            <p data-show={showInfo.toString()} className={styles.infoMessage}>{infoMessage}</p>
                        </section>

                        <button type='submit' className={styles.signinButton}>Sign In</button>
                    </form>
                </main>

                <Footer />
            </div>
        </>
    );
};
