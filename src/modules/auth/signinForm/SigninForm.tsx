
import styles from './SigninForm.module.css'

import { useId } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputs = {
    email: string,
    password: string,
};

export const SigninForm = () => {

    const inputID = useId();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        // Handle submit here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Sign In</h2>

            <fieldset
                data-error={errors.email !== undefined}
                className={styles.inputFieldset}
            >
                <label htmlFor={'email' + inputID} className={styles.inputLabel}>Email:</label>
                <input
                    {...register('email', {
                        required: true,
                    })}
                    id={'email' + inputID}
                    className={styles.input}
                />
            </fieldset>

            <fieldset
                data-error={errors.password !== undefined}
                className={styles.inputFieldset}
            >
                <label htmlFor={'password' + inputID} className={styles.inputLabel}>Password:</label>
                <input
                    {...register('password', {
                        required: true,
                    })}
                    id={'password' + inputID}
                    className={styles.input}
                />
            </fieldset>

            <button type='submit' className={styles.submitButton}>Sign In</button>
        </form>
    );
};
