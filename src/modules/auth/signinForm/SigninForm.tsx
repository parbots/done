
import styles from './SigninForm.module.css'

import { useId } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputs = {
    email: string,
    password: string,
};

export const SigninForm = () => {

    const inputID = useId();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        // Handle submit here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Sign In</h2>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'email' + inputID} className={styles.inputLabel}>Email:</label>
                <input
                    {...register('email', {
                        required: true,
                        minLength: 1,
                    })}
                    id={'email' + inputID}
                    className={styles.input}
                />
                {errors.email?.type === 'required' && 'email is required'}
            </fieldset>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'password' + inputID} className={styles.inputLabel}>Password:</label>
                <input
                    {...register('password', {
                        required: true,
                        minLength: 8,
                    })}
                    id={'password' + inputID}
                    className={styles.input}
                />
                {errors.password?.type === 'required' && 'password is required'}
                {errors.password?.type === 'minLength' && 'password must be 8 characters'}
            </fieldset>

            <button type='submit'>Sign In</button>
        </form>
    );
};
