
import styles from './SigninForm.module.css'

import { useRouter } from 'next/router'

import { useId, useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import * as Sentry from '@sentry/nextjs'

type FormInputs = {
    email: string,
    password: string,
};

export const SigninForm = () => {

    const router = useRouter();

    const supabase = useSupabaseClient();
    const [authError, setAuthError] = useState<string | null>(null);

    const signinUser = async (formEmail: string, formPassword: string) => {

        setAuthError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email: formEmail,
            password: formPassword,
        });

        if (error) {
            Sentry.captureException(error);

            setAuthError('Unable to sign in, please confirm email and password are correct and try again.');

            return
        }

        router.push('/list');
    };

    const inputID = useId();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        signinUser(data.email, data.password);
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
                        required: 'Please enter an email',
                    })}
                    id={'email' + inputID}
                    className={styles.input}
                />
                {errors.email &&
                    <p className={styles.inputError}>{errors.email.message}</p>
                }
            </fieldset>

            <fieldset
                data-error={errors.password !== undefined}
                className={styles.inputFieldset}
            >
                <label htmlFor={'password' + inputID} className={styles.inputLabel}>Password:</label>
                <input
                    {...register('password', {
                        required: 'Please enter a password',
                    })}
                    id={'password' + inputID}
                    className={styles.input}
                />
                {errors.password &&
                    <p className={styles.inputError}>{errors.password.message}</p>
                }
            </fieldset>

            <button type='submit' className={styles.submitButton}>Sign In</button>

            {authError &&
                <p className={styles.authError}>{authError}</p>
            }
        </form>
    );
};
