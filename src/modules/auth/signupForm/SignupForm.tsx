
import styles from './SignupForm.module.css'

import { useRouter } from 'next/router'

import { useRef, useId, useState, useEffect } from 'react'

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

    const inputID = useId();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        mode: 'onChange',
        criteriaMode: 'all',
    });

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        signupUser(data.email, data.confirmPassword);
    };

    const supabase = useSupabaseClient();

    const [authError, setAuthError] = useState<string | null>(null);
    const authErrorRef = useRef<HTMLParagraphElement | null>(null);

    const signupUser = async (formEmail: string, formPassword: string) => {

        setAuthError(null);

        const { error } = await supabase.auth.signUp({
            email: formEmail,
            password: formPassword,
        });

        if (error) {
            Sentry.captureException(error);

            setAuthError('Unable to create new user, make sure that the email is valid and not already signed up');

            return
        }

        router.push('/list');
    };

    useEffect(() => {
        if (authErrorRef.current) authErrorRef.current.scrollIntoView();
    }, [authErrorRef]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Sign Up</h2>

            <fieldset data-error={errors.email ? 'true' : 'false'} className={styles.inputFieldset}>
                <label htmlFor={'email' + inputID} className={styles.inputLabel}>Email:</label>
                <input
                    {...register('email', {
                        required: 'Required',
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

                {errors.email &&
                    <p role='alert' className={styles.inputError}>{errors.email.message}</p>
                }
            </fieldset>

            <fieldset data-error={errors.password ? 'true' : 'false'} className={styles.inputFieldset}>
                <label htmlFor={'password' + inputID} className={styles.inputLabel}>Password:</label>
                <input
                    {...register('password', {
                        required: 'Required',
                        minLength: {
                            value: 8,
                            message: 'Must be at least 8 characters',
                        },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{1,}$/,
                            message: 'Must contain at least 1 number, uppercase letter, and lowercase letter',
                        }
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

            <fieldset data-error={errors.confirmPassword ? 'true' : 'false'} className={styles.inputFieldset} >
                <label htmlFor={'confirmPassword' + inputID} className={styles.inputLabel}>Confirm Password:</label>
                <input
                    {...register('confirmPassword', {
                        required: 'Required',
                        validate: (value, formValues) => {
                            return (value === formValues.password
                                ? true
                                : 'Must match password'
                            );
                        },
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
                <p role='alert' ref={authErrorRef} className={styles.authError}>{authError}</p>
            }
        </form>
    );
};
