
import styles from './SignoutButton.module.css'

import { useRouter } from 'next/router'

import { MouseEvent } from 'react'

import { useSupabaseClient } from '@supabase/auth-helpers-react';

import * as Sentry from '@sentry/nextjs'

import { Button } from '@/components/button'

export const SignoutButton = () => {

    const router = useRouter();

    const supabase = useSupabaseClient();

    const handleSignout = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        router.push('/');

        const { error } = await supabase.auth.signOut();

        if (error) Sentry.captureException(error);
    };

    return (
        <Button onClick={handleSignout} className={styles.button}>Sign Out</Button>
    );
};
