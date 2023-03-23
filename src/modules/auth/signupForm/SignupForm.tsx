
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

            setAuthError('Unable to create new user, make sure that the email is valid and not already signed up');

            return
        }

        router.push('/list');
    };

    const authErrorRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        if (authErrorRef) authErrorRef.current?.scrollIntoView();
    }, [authErrorRef]);

    const inputID = useId();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>({
        mode: 'onChange',
        criteriaMode: 'all',
    });

    const watchEmail = watch('email');
    const watchPassword = watch('password');
    const watchConfirmPassword = watch('confirmPassword');

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        signupUser(data.email, data.confirmPassword);
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

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

                {!watchEmail &&
                    <p
                        className={styles.inputError}
                    >
                        Must be a valid email address
                    </p>
                }
                {watchEmail &&
                    <p
                        data-error={errors.email ? 'true' : 'false'}
                        role={errors.email ? 'alert' : ''}
                        className={styles.inputError}
                    >
                        Must be a valid email address
                    </p>
                }
            </fieldset>

            <fieldset
                data-error={errors.password ? 'true' : 'false'}
                className={styles.inputFieldset}
            >
                <label htmlFor={'password' + inputID} className={styles.inputLabel}>Password:</label>
                <input
                    {...register('password', {
                        required: true,
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                            message: 'Must contain at least 1 number, uppercase letter, and lowercase letter',
                        }
                    })}
                    type='password'
                    aria-invalid={errors.password ? 'true' : 'false'}
                    id={'password' + inputID}
                    className={styles.input}
                />

                {!watchPassword &&
                    <p className={styles.inputError} >
                        Must be 8 or more characters and contain at least 1 number, lowercase letter, and uppercase letter
                    </p>
                }
                {watchPassword &&
                    <p
                        data-error={errors.password ? 'true' : 'false'}
                        role={errors.password ? 'alert' : ''}
                        className={styles.inputError}
                    >
                        Must be 8 or more characters and contain at least 1 number, lowercase letter, and uppercase letter
                    </p>
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
                        validate: (value, formValues) => {
                            return value === formValues.password;
                        },
                    })}
                    type='password'
                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                    id={'confirmPassword' + inputID}
                    className={styles.input}
                />

                {!watchConfirmPassword &&
                    <p className={styles.inputError}>
                        Must match password
                    </p>
                }
                {watchConfirmPassword &&
                    <p
                        data-error={errors.confirmPassword ? 'true' : 'false'}
                        role={errors.confirmPassword ? 'alert' : ''}
                        className={styles.inputError}
                    >
                        Must match password
                    </p>
                }
            </fieldset>

            <button type='submit' className={styles.submitButton}>Sign Up</button>

            {authError &&
                <p role='alert' ref={authErrorRef} className={styles.authError}>{authError}</p>
            }
        </form>
    );
};
