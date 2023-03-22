
import styles from '@/styles/SignupPage.module.css'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function SignupPage() {

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

    const [repeatPasswordInputValue, setRepeatPasswordInputValue] = useState<string>('');

    const handleRepeatPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setRepeatPasswordInputValue(event.target.value);
    };

    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('info');

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setShowInfo(false);

        // Check if email input is valid
        if (!emailInputValue.includes('@')) {
            setInfoMessage('Please enter a valid email');
            setShowInfo(true);

            return;
        }

        // Check if password is valid
        if (passwordInputValue.length < 8) {
            setInfoMessage('Password must be at least 8 characters');
            setShowInfo(true);

            return;
        }

        // Check if passwords match
        if (passwordInputValue !== repeatPasswordInputValue) {
            setInfoMessage('Passwords do not match');
            setShowInfo(true);

            return;
        }

        // Request signup from supabase server
        const { error } = await supabase.auth.signUp({
            email: emailInputValue.trim(),
            password: passwordInputValue,
        });

        // Show server signup errors
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
                    <Link href='/signin' className={styles.headerLink}>Sign In</Link>
                </Header>

                <main className={styles.main}>
                    <form onSubmit={handleFormSubmit} className={styles.signupForm}>
                        <fieldset className={styles.emailFieldset}>
                            <label htmlFor='signupEmailInput' className={styles.emailLabel}>Email:</label>
                            <input
                                type='email'
                                id='signupEmailInput'
                                value={emailInputValue}
                                onChange={handleEmailInput}
                                className={styles.emailInput}
                            />
                        </fieldset>

                        <fieldset className={styles.passwordFieldset}>
                            <label htmlFor='signupPasswordInput' className={styles.passwordLabel}>Password:</label>
                            <input
                                type='password'
                                id='signupPasswordInput'
                                value={passwordInputValue}
                                onChange={handlePasswordInput}
                                className={styles.passwordInput}
                            />
                        </fieldset>

                        <fieldset className={styles.passwordFieldset}>
                            <label htmlFor='signupRepeatPasswordInput' className={styles.passwordLabel}>Confirm Password:</label>
                            <input
                                type='password'
                                id='signupRepeatPasswordInput'
                                value={repeatPasswordInputValue}
                                onChange={handleRepeatPasswordInput}
                                className={styles.passwordInput}
                            />
                        </fieldset>

                        <button type='submit' className={styles.signupButton}>Sign Up</button>

                        <section data-show={showInfo.toString()} className={styles.infoSection}>
                            <p className={styles.infoMessage}>{infoMessage}</p>
                        </section>
                    </form>
                </main>

                <Footer />
            </div>
        </>
    );
};
