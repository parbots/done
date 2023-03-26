
import styles from './ChangePasswordForm.module.css'

import { useId } from 'react'

export const ChangePasswordForm = () => {

    const inputID = useId();

    return (
        <form className={styles.form}>
            <h2 className={styles.title}>Change Password</h2>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'currentPassword' + inputID} className={styles.inputLabel}>Current Password:</label>
                <input
                    type='password'
                    id={'currentPassword' + inputID}
                    className={styles.input}
                />
            </fieldset>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'newPassword' + inputID} className={styles.inputLabel}>New Password:</label>
                <input
                    type='password'
                    id={'newPassword' + inputID}
                    className={styles.input}
                />
            </fieldset>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'confirmNewPassword' + inputID} className={styles.inputLabel}>Confirm New Password:</label>
                <input
                    type='password'
                    id={'confirmNewPassword' + inputID}
                    className={styles.input}
                />
            </fieldset>

            <button type='submit' className={styles.submitButton}>Change Password</button>
        </form>
    );
};
