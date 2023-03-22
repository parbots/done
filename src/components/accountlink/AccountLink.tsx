
import styles from './AccountLink.module.css'

import Link from 'next/link'

export const AccountLink = () => {
    return (
        <Link href='/account' className={styles.link}>
        </Link>
    );
};

