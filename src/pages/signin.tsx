
import Head from 'next/head'

import styles from '@styles/SigninPage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function SigninPage() {
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
                    <form className={styles.signinForm}>
                        <fieldset className={styles.emailFieldset}>
                            <label htmlFor='signinEmailInput'>Email:</label>
                            <input type='email' id='signinEmailInput' value='' className={styles.emailInput} />
                        </fieldset>

                        <fieldset className={styles.passwordFieldset}>
                            <label htmlFor='signinPasswordInput'>Password:</label>
                            <input type='password' id='signinPasswordInput' value='' className={styles.passwordInput} />
                        </fieldset>

                        <button type='submit' className={styles.signinButton}>Sign In</button>
                    </form>
                </main>

                <Footer />
            </div>
        </>
    );
};
