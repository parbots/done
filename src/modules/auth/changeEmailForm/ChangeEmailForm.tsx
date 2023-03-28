
import styles from './ChangeEmailForm.module.css'

import { useId } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

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
