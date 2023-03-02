
import { ChangeEvent, useState } from 'react';
import { FormEvent } from 'react';

import styles from './ListMenu.module.css'

type ListMenuProps = {
    addItem: (itemName: string) => void;
};

export const ListMenu = (props: ListMenuProps) => {

    const [itemInputValue, setItemInputValue] = useState('');

    const handleItemInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setItemInputValue(event.target.value);
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (itemInputValue !== '' && itemInputValue[0] !== ' ') {
            props.addItem(itemInputValue);
            setItemInputValue('');
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className={styles.menu}>
            <section className={styles.addItemSection}>
                <input
                    type="text"
                    name='itemInput'
                    placeholder='Enter new todo...'
                    value={itemInputValue}
                    onChange={handleItemInputChange}
                    className={styles.itemInput}
                />
                <button type="submit" className={styles.addItemButton}>Add</button>
            </section>
        </form>
    );
};
