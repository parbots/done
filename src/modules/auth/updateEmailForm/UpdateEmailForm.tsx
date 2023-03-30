
import styles from './UpdateEmailForm.module.css'

import { useId, useRef, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'

import * as Sentry from '@sentry/nextjs'

import { Button } from '@/components/button'

type FormInputs = {
    newEmail: string,
    confirmNewEmail: string,
};

export const UpdateEmailForm = () => {

    const id = useId();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        mode: 'onChange',
        criteriaMode: 'all',
    });

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        updateUserEmail(data.newEmail);
    };

    const supabase = useSupabaseClient();
    const { isLoading, session } = useSessionContext();

    const [authError, setAuthError] = useState<string | null>(null);
    const authErrorRef = useRef<HTMLParagraphElement | null>(null);

    const updateUserEmail = async (newEmail: string) => {

        setAuthError(null);

        const { error: updateUserError } = await supabase.auth.updateUser({
            email: newEmail,
        });

        if (updateUserError) {
            Sentry.captureException(updateUserError);

            setAuthError('Unable to update user email, the new email may already be taken or a server errror occurred');

            return
        }

        // push a new page that explains user will need to confirm new email

        const { error: signoutError } = await supabase.auth.signOut();

        if (signoutError) Sentry.captureException(signoutError);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h3 className={styles.title}>Change Email</h3>

            <section className={styles.section}>
                <label htmlFor={'currentEmail' + id} className={styles.sectionLabel}>Current Email:</label>
                {isLoading &&
                    <p id={'currentEmail' + id} className={styles.sectionText}>Loading...</p>
                }
                {!isLoading && session &&
                    <p id={'currentEmail' + id} className={styles.sectionText}>{session.user.email}</p>
                }
            </section>

            <fieldset data-error={errors.newEmail ? 'true' : 'false'} className={styles.inputFieldset}>
                <label htmlFor={'newEmail' + id} className={styles.inputLabel}>New Email:</label>
                <input
                    {...register('newEmail', {
                        required: 'Required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Must be a valid email address',
                        },
                        validate: (value) => {
                            return value !== session?.user.email
                                ? true
                                : 'Must be different than current email';
                        },
                    })}
                    type='text'
                    aria-invalid={errors.newEmail ? 'true' : 'false'}
                    id={'newEmail' + id}
                    className={styles.input}
                />
                {errors.newEmail &&
                    <p role='alert' className={styles.inputError}>{errors.newEmail.message}</p>
                }
            </fieldset>

            <fieldset data-error={errors.confirmNewEmail ? 'true' : 'false'} className={styles.inputFieldset}>
                <label htmlFor={'confirmNewEmail' + id} className={styles.inputLabel}>Confirm New Email:</label>
                <input
                    {...register('confirmNewEmail', {
                        required: 'Required',
                        validate: (value, formValues) => {
                            return value === formValues.newEmail
                                ? true
                                : 'Must match new email';
                        },
                    })}
                    type='text'
                    aria-invalid={errors.confirmNewEmail ? 'true' : 'false'}
                    id={'confirmNewEmail' + id}
                    className={styles.input}
                />
                {errors.confirmNewEmail &&
                    <p role='alert' className={styles.inputError}>{errors.confirmNewEmail.message}</p>
                }
            </fieldset>

            <Button type='submit'>Change Email</Button>

            {authError &&
                <p role='alert' ref={authErrorRef} className={styles.authError}>{authError}</p>
            }
        </form>
    );
};
