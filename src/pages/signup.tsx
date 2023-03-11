
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import styles from '@styles/SignupPage.module.css'

import { Footer } from '@components/footer'

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

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO show ui instead of alerts for errors

        if (!emailInputValue.includes('@')) {
            alert('Please enter a valid email!');
            return;
        }

        if (passwordInputValue.length < 8) {
            alert('Password must be at least 8 characters!');
            return;
        }

        if (passwordInputValue !== repeatPasswordInputValue) {
            alert('Passwords do not match!');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: emailInputValue,
            password: passwordInputValue,
        });

        // TODO show ui instead of alerts for server errors

        if (error) {
            alert(error.message);
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
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>done</h2>

                    <nav className={styles.headerNav}>
                        <Link href='/signin' className={styles.headerNavLink}>Sign In</Link>
                    </nav>
                </header>

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
                    </form>
                </main>

                <Footer />
            </div>
        </>
    );
};
