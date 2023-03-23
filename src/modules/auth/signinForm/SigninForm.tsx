
import styles from './SigninForm.module.css'

export const SigninForm = () => {
    return (
        <form className={styles.form}>
            <h2 className={styles.title}>Sign In</h2>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor='' className={styles.inputLabel}>Email:</label>
                <input type='email' value='' className={styles.input} />
            </fieldset>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor='' className={styles.inputLabel}>Password:</label>
                <input type='password' value='' className={styles.input} />
            </fieldset>

            <button type='submit'>Sign In</button>
        </form>
    );
};
