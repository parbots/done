
import styles from './Button.module.css'

import { ButtonHTMLAttributes } from 'react'

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={styles.button + ' ' + props.className}
        >
            {props.children}
        </button>
    );
};
