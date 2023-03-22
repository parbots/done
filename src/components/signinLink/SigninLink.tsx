
import styles from './SigninLink.module.css'

import Link from 'next/link'

export const SigninLink = () => {
    return (
        <Link href='/signin' className={styles.link}>Sign In</Link>
    );
};

