
import styles from './Header.module.css'

import { ReactNode } from 'react'

import { useSessionContext } from '@supabase/auth-helpers-react'

import { ButtonLink } from '@/components/buttonLink'

type HeaderProps = {
    children?: ReactNode;
    useSession?: boolean;
};

export const Header = ({ children = null, useSession = true }: HeaderProps) => {

    const { isLoading, session, error } = useSessionContext();

    if (error) {
        return (
            <header className={styles.header}>
                <h4 className={styles.title}>done</h4>

                {error &&
                    <nav className={styles.nav}>
                        <p className={styles.error}>{error.message}</p>
                    </nav>
                }
            </header>
        );
    }

    // If page does not change with session, just show children
    if (!useSession) {
        return (
            <header className={styles.header}>
                <h4 className={styles.title}>done</h4>

                <nav className={styles.nav}>
                    {children}
                </nav>
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <h4 className={styles.title}>done</h4>

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
