
import { ChangeEvent, useState } from 'react';
import { FormEvent } from 'react';

import styles from './ListMenu.module.css'

type Filter = 'all' | 'incomplete' | 'complete';

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

    // TODO lift this state up
    const [searchInputValue, setSearchInputValue] = useState('');

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setSearchInputValue(event.target.value);
    };

    // TODO lift this state up
    const [filterValue, setFilterValue] = useState<Filter>('all');

    const handleFilterRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setFilterValue(event.target.value as Filter);
    };

    return (
        <form onSubmit={handleFormSubmit} className={styles.menu}>
            <fieldset className={styles.addItemSection}>
                <input
                    type="text"
                    name='itemInput'
                    placeholder='Enter new todo...'
                    value={itemInputValue}
                    onChange={handleItemInputChange}
                    className={styles.itemInput}
                />
                <button type="submit" className={styles.addItemButton}>Add</button>
            </fieldset>

            <fieldset className={styles.filterSection}>
                <input
                    type='text'
                    name='searchInput'
                    placeholder='Search...'
                    value={searchInputValue}
                    onChange={handleSearchInputChange}
                    className={styles.searchInput}
                />

                <label htmlFor='filterRadioField' className={styles.filterRadioSectionLabel}>Show:</label>
                <fieldset id='filterRadioField' className={styles.filterRadioSection}>
                    <label
                        htmlFor='show-all'
                        data-selected={(filterValue === 'all').toString()}
                        className={styles.filterLabel}
                    >
                        <input
                            type='radio'
                            name='show'
                            id='show-all'
                            value='all'
                            checked={filterValue === 'all'}
                            onChange={handleFilterRadioChange}
                            className={styles.filterRadio}
                        />
                        All
                    </label>

                    <label
                        htmlFor='show-incomplete'
                        data-selected={(filterValue === 'incomplete').toString()}
                        className={styles.filterLabel}
                    >
                        <input
                            type='radio'
                            name='show'
                            id='show-incomplete'
                            value='incomplete'
                            checked={filterValue === 'incomplete'}
                            onChange={handleFilterRadioChange}
                            className={styles.filterRadio}
                        />
                        Doing
                    </label>

                    <label
                        htmlFor='show-complete'
                        data-selected={(filterValue === 'complete').toString()}
                        className={styles.filterLabel}
                    >
                        <input
                            type='radio'
                            name='show'
                            id='show-complete'
                            value='complete'
                            checked={filterValue === 'complete'}
                            onChange={handleFilterRadioChange}
                            className={styles.filterRadio}
                        />
                        Done
                    </label>
                </fieldset>
            </fieldset>
        </form>
    );
};
