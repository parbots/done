
import styles from './SignupLink.module.css'

import Link from 'next/link'

export const SignupLink = () => {
    return (
        <Link href='/signup' className={styles.link}>Sign Up</Link>
    );
};

