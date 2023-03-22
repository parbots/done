
import styles from './AccountLink.module.css'

import Link from 'next/link'

import { useSessionContext } from '@supabase/auth-helpers-react'

import * as Sentry from '@sentry/nextjs'

export const AccountLink = () => {

    const { isLoading, session, error } = useSessionContext();

    if (error) {
        Sentry.captureException(error);

        return (
            <p className={styles.error}>{error.message}</p>
        );
    };

    if (isLoading || !session) {
        return (
            <p className={styles.loading}>Loading...</p>
        );
    }

    return (
        <Link href='/account' className={styles.link}>Account</Link>
    );
};

