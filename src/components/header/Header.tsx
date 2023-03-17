
import styles from './Header.module.css'

import { ReactNode } from 'react'

type HeaderProps = {
    children: ReactNode;
};

export const Header = (props: HeaderProps) => {
    return (
        <header className={styles.header}>
            <h2 className={styles.headerTitle}>done</h2>

            <nav className={styles.headerNav}>
                {props.children}
            </nav>
        </header>
    );
};

