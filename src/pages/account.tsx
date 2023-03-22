
import styles from '@/styles/AccountPage.module.css'

import Head from 'next/head'
import Link from 'next/link'

import { ChangeEvent, FormEvent, useId, useState } from 'react'

import { useSessionContext } from '@supabase/auth-helpers-react'

import { Header } from '@/components/header'
import { SignoutButton } from '@/components/signoutButton'

import { Footer } from '@/components/footer'

export default function AccountPage() {

    const inputID = useId();

    const { isLoading, session, error } = useSessionContext();

    const [currentPasswordInputValue, setCurrentPasswordInputValue] = useState<string>('');
    const [newPasswordInputValue, setNewPasswordInputValue] = useState<string>('');
    const [confirmPasswordInputValue, setConfirmPasswordInputValue] = useState<string>('');

    const handleCurrentPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setCurrentPasswordInputValue(event.target.value);
    };

    const handleNewPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setNewPasswordInputValue(event.target.value);
    };

    const handleConfirmPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setConfirmPasswordInputValue(event.target.value);
    };

    const handleChangePasswordForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Handle password validation

        // Handle password change
    };

    const [deleteEmailInputValue, setDeleteEmailInputValue] = useState<string>('');

    const [deletePasswordInputValue, setDeletePasswordInputValue] = useState<string>('');

    const handleDeleteEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setDeleteEmailInputValue(event.target.value);
    };

    const handleDeletePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setDeletePasswordInputValue(event.target.value);
    };

    const handleActionForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Handle authentication

        // Handle delete account
        
        // Reroute to homepage
    };

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
                        <Link href='/list' className={styles.headerLink}>My List</Link>
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
                    <Link href='/list' className={styles.headerLink}>My List</Link>
                    <SignoutButton />
                </Header>

                {isLoading &&
                    <main className={styles.main}>
                        <p className={styles.loading}>Loading...</p>
                    </main>
                }

                {!isLoading && session &&
                    <main className={styles.main}>
                        <form onSubmit={handleChangePasswordForm} className={styles.changePasswordForm}>
                            <h2 className={styles.sectionTitle}>Change Password</h2>

                            <fieldset className={styles.changePasswordFieldset}>
                                <label htmlFor={'currentPassword' + inputID} className={styles.changePasswordLabel}>Current Password:</label>
                                <input
                                    type='password'
                                    id={'currentPassword' + inputID}
                                    value={currentPasswordInputValue}
                                    onChange={handleCurrentPasswordInput}
                                    className={styles.changePasswordInput}
                                />
                            </fieldset>

                            <fieldset className={styles.changePasswordFieldset}>
                                <label htmlFor={'newPassword' + inputID} className={styles.changePasswordLabel}>New Password:</label>
                                <input
                                    type='password'
                                    id={'newPassword' + inputID}
                                    value={newPasswordInputValue}
                                    onChange={handleNewPasswordInput}
                                    className={styles.changePasswordInput}
                                />
                            </fieldset>

                            <fieldset className={styles.changePasswordFieldset}>
                                <label htmlFor={'confirmPassword' + inputID} className={styles.changePasswordLabel}>Confirm New Password:</label>
                                <input
                                    type='password'
                                    id={'confirmPassword' + inputID}
                                    value={confirmPasswordInputValue}
                                    onChange={handleConfirmPasswordInput}
                                    className={styles.changePasswordInput}
                                />
                            </fieldset>

                            <button type='submit' className={styles.changePasswordButton}>Change Password</button>
                        </form>

                        <form onSubmit={handleActionForm} className={styles.actionForm}>
                            <h2 className={styles.sectionTitle}>Delete Account</h2>

                            <fieldset className={styles.deleteActionFieldset}>
                                <label htmlFor={'deleteEmail' + inputID} className={styles.deleteActionLabel}>Email:</label>
                                <input
                                    type='email'
                                    id={'deleteEmail' + inputID}
                                    value={deleteEmailInputValue}
                                    onChange={handleDeleteEmailInput}
                                    className={styles.deleteActionInput}
                                />
                            </fieldset>

                            <fieldset className={styles.deleteActionFieldset}>
                                <label htmlFor={'deletePassword' + inputID} className={styles.deleteActionLabel}>Password:</label>
                                <input
                                    type='password'
                                    id={'deletePassword' + inputID}
                                    value={deletePasswordInputValue}
                                    onChange={handleDeletePasswordInput}
                                    className={styles.deleteActionInput}
                                />
                            </fieldset>

                            <button type='submit' className={styles.deleteActionButton}>Delete Account</button>
                        </form>
                    </main>
                }

                <Footer />
            </div>
        </>
    );
};
