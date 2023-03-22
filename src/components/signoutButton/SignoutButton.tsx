
import styles from './SignoutButton.module.css'

import { MouseEvent } from 'react'

import { useSupabaseClient } from '@supabase/auth-helpers-react';

import * as Sentry from '@sentry/nextjs'

export const SignoutButton = () => {

    const supabase = useSupabaseClient();

    const handleSignout = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const { error } = await supabase.auth.signOut();

        if (error) Sentry.captureException(error);
    };

    return (
        <button onClick={handleSignout} className={styles.button}>Sign Out</button>
    );
};