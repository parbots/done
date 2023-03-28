
import styles from './ButtonLink.module.css'

import Link from 'next/link'

type ButtonLinkProps = {
    href: string;
    text: string;
    className?: string;
};

export const ButtonLink = ({href, text, className = ''}: ButtonLinkProps) => {
    return (
        <Link href={href} className={styles.link + ' ' + className}>{text}</Link>
    );

};
