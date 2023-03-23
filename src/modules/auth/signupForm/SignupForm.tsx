
import styles from './SignupForm.module.css'

import { useRouter } from 'next/router'

import { useEffect, useId, useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import * as Sentry from '@sentry/nextjs'

type FormInputs = {
    email: string,
    password: string,
    confirmPassword: string,
};

export const SignupForm = () => {

    const router = useRouter();

    const supabase = useSupabaseClient();
    const [authError, setAuthError] = useState<string | null>(null);

    const signupUser = async (formEmail: string, formPassword: string) => {

        setAuthError(null);

        const { error } = await supabase.auth.signUp({
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

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>({
        mode: 'onChange',
    });

    const watchEmail = watch('email');

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        signupUser(data.email, data.confirmPassword);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Sign Up</h2>

            <fieldset
                data-error={errors.email ? 'true' : 'false'}
                className={styles.inputFieldset}
            >
                <label htmlFor={'email' + inputID} className={styles.inputLabel}>Email:</label>
                <input
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Must be a valid email address',
                        }
                    })}
                    type='text'
                    aria-invalid={errors.email ? 'true' : 'false'}
                    id={'email' + inputID}
                    className={styles.input}
                />

                <p
                    data-error={errors.email || !watchEmail ? 'true' : 'false'}
                    role={errors.email ? 'alert' : ''}
                    className={styles.inputError}
                >
                    Must be a valid email address
                </p>
            </fieldset>

            <fieldset
                data-error={errors.password ? 'true' : 'false'}
                className={styles.inputFieldset}
            >
                <label htmlFor={'password' + inputID} className={styles.inputLabel}>Password:</label>
                <input
                    {...register('password', {
                        required: 'Please enter a password',
                        minLength: 8,
                    })}
                    type='password'
                    aria-invalid={errors.password ? 'true' : 'false'}
                    id={'password' + inputID}
                    className={styles.input}
                />
                {errors.password &&
                    <p role='alert' className={styles.inputError}>{errors.password.message}</p>
                }
            </fieldset>

            <fieldset
                data-error={errors.confirmPassword ? 'true' : 'false'}
                className={styles.inputFieldset}
            >
                <label htmlFor={'confirmPassword' + inputID} className={styles.inputLabel}>Confirm Password:</label>
                <input
                    {...register('confirmPassword', {
                        required: 'Please enter confirm password',
                        minLength: 8,
                    })}
                    type='password'
                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                    id={'confirmPassword' + inputID}
                    className={styles.input}
                />
                {errors.confirmPassword &&
                    <p role='alert' className={styles.inputError}>{errors.confirmPassword.message}</p>
                }
            </fieldset>

            <button type='submit' className={styles.submitButton}>Sign Up</button>

            {authError &&
                <p role='alert' className={styles.authError}>{authError}</p>
            }
        </form>
    );
};
