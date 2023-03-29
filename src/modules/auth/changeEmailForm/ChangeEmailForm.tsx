
import styles from './ChangeEmailForm.module.css'

import { useId } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useSessionContext } from '@supabase/auth-helpers-react'

import { Button } from '@/components/button'

type FormInputs = {
    newEmail: string,
    confirmNewEmail: string,
};

export const ChangeEmailForm = () => {

    const id = useId();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        mode: 'onChange',
        criteriaMode: 'all',
    });

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        // Change email here
    };

    const { session } = useSessionContext();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h3 className={styles.title}>Change Email</h3>

            <section className={styles.section}>
                <label htmlFor={'currentEmail' + id} className={styles.sectionLabel}>Current Email:</label>
                <p id={'currentEmail' + id} className={styles.sectionText}>test</p>
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
                    <p role='alert' className={styles.error}>{errors.newEmail.message}</p>
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
                    <p role='alert' className={styles.error}>{errors.confirmNewEmail.message}</p>
                }
            </fieldset>

            <Button type='submit'>Change Email</Button>
        </form>
    );
};
