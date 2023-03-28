
import styles from './ChangeEmailForm.module.css'

import { useId } from 'react'

import { Button } from '@/components/button'

export const ChangeEmailForm = () => {

    const id = useId();

    return (
        <form className={styles.form}>
            <h3 className={styles.title}>Change Email</h3>

            <section className={styles.section}>
                <label htmlFor={'currentEmail' + id} className={styles.sectionLabel}>Current Email:</label>
                <p id={'currentEmail' + id} className={styles.sectionText}>test</p>
            </section>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'newEmail' + id} className={styles.inputLabel}>New Email:</label>
                <input
                    type='text'
                    id={'newEmail' + id}
                    className={styles.input}
                />
                <p className={styles.error}></p>
            </fieldset>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'confirmNewEmail' + id} className={styles.inputLabel}>Confirm New Email:</label>
                <input
                    type='text'
                    id={'confirmNewEmail' + id}
                    className={styles.input}
                />
                <p className={styles.error}></p>
            </fieldset>

            <Button type='submit'>Change Email</Button>
        </form>
    );
};
