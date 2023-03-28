
import styles from './Header.module.css'

import { ReactNode } from 'react'

import { useSessionContext } from '@supabase/auth-helpers-react'

import { ButtonLink } from '@/components/buttonLink'

type HeaderProps = {
    children: ReactNode;
    useSession?: boolean;
};

export const Header = ({ children, useSession = true }: HeaderProps) => {

    const { isLoading, session, error } = useSessionContext();

    // If page does not change with session, just show children
    if (!useSession) {
        return (
            <header className={styles.header}>
                <h2 className={styles.title}>done</h2>

                <nav className={styles.nav}>
                    {children}
                </nav>
            </header>
        );
    }

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
                    <ButtonLink href='/signin' text='Sign In' />
                    <ButtonLink href='/signup' text='Sign Up' />
                </nav>
            }

            {!isLoading && session &&
                <nav className={styles.nav}>
                    {children}
                </nav>
            }
        </header>
    );
};

