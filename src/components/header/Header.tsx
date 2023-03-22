
import styles from './Header.module.css'

import { ReactNode } from 'react'

import { useSessionContext } from '@supabase/auth-helpers-react'

import { SigninLink } from '@/components/signinLink'
import { SignupLink } from '@/components/signupLink'

type HeaderProps = {
    children: ReactNode;
};

export const Header = (props: HeaderProps) => {

    const { isLoading, session, error } = useSessionContext();

    if (error) {
        return (
            <header className={styles.header}>
                <h2 className={styles.title}>done</h2>

                {error &&
                    <nav className={styles.nav}>
                        <p className={styles.error}>{error.message}</p>
                    </nav>
                }
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <h2 className={styles.title}>done</h2>

            {isLoading &&
                <nav className={styles.nav}>
                    <p className={styles.loading}>Loading...</p>
                </nav>
            }

            {!isLoading && !session &&
                <nav className={styles.nav}>
                    <SigninLink />
                    <SignupLink />
                </nav>
            }

            {!isLoading && session &&
                <nav className={styles.nav}>
                    {props.children}
                </nav>
            }
        </header>
    );
};

