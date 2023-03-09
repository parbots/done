
import Head from 'next/head'

import { ChangeEvent, FormEvent, useState } from 'react'

import styles from '@styles/SigninPage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function SigninPage() {

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

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO handle validation and signin
    };

    return (
        <>
            <Head>
                <title>Sign In</title>
                <meta name='description' content='Get stuff done.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <Header />

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

                        <button type='submit' className={styles.signinButton}>Sign In</button>
                    </form>
                </main>

                <Footer />
            </div>
        </>
    );
};
