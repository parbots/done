
import styles from './ChangePasswordForm.module.css'

import { useId } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

type FormInputs = {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
};

export const ChangePasswordForm = () => {

    const inputID = useId();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        mode: 'onChange',
        criteriaMode: 'all',
    });

    const onSubmit: SubmitHandler<FormInputs> = (data, event) => {
        event?.preventDefault();

        // Change user password
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Change Password</h2>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'currentPassword' + inputID} className={styles.inputLabel}>Current Password:</label>
                <input
                    {...register('currentPassword', {
                        required: true,
                    })}
                    type='password'
                    id={'currentPassword' + inputID}
                    className={styles.input}
                />
            </fieldset>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'newPassword' + inputID} className={styles.inputLabel}>New Password:</label>
                <input
                    {...register('newPassword', {
                        required: true,
                    })}
                    type='password'
                    id={'newPassword' + inputID}
                    className={styles.input}
                />
            </fieldset>

            <fieldset className={styles.inputFieldset}>
                <label htmlFor={'confirmNewPassword' + inputID} className={styles.inputLabel}>Confirm New Password:</label>
                <input
                    {...register('confirmNewPassword', {
                        required: true,
                    })}
                    type='password'
                    id={'confirmNewPassword' + inputID}
                    className={styles.input}
                />
            </fieldset>

            <button type='submit' className={styles.submitButton}>Change Password</button>
        </form>
    );
};
