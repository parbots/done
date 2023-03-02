
import Link from 'next/link';

import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <h2 className={styles.title}>done</h2>
            <nav className={styles.nav}>
                <Link href='/' className={styles.navLink + ' ' + styles.loginLink}>Login</Link>
                <Link href='/' className={styles.navLink + ' ' + styles.signupLink}>Sign Up</Link>
            </nav>
        </header>
    );
};
