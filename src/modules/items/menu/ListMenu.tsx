
import { ChangeEvent, useState } from 'react';
import { FormEvent } from 'react';

import styles from './ListMenu.module.css';

import type { Filter } from 'types/item';

type ListMenuProps = {
    addItem: (itemName: string) => void;
    searchValue: string;
    setSearchValue: (newSearchValue: string) => void;
    currentFilter: Filter;
    setCurrentFilter: (newFilter: Filter) => void;
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

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        props.setSearchValue(event.target.value);
    };

    const handleFilterRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        props.setCurrentFilter(event.target.value as Filter);
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
                    value={props.searchValue}
                    onChange={handleSearchInputChange}
                    className={styles.searchInput}
                />

                <label htmlFor='filterRadioField' className={styles.filterRadioSectionLabel}>Show:</label>
                <fieldset id='filterRadioField' className={styles.filterRadioSection}>
                    <label
                        htmlFor='show-all'
                        data-selected={(props.currentFilter === 'all').toString()}
                        className={styles.filterLabel}
                    >
                        <input
                            type='radio'
                            name='show'
                            id='show-all'
                            value='all'
                            checked={props.currentFilter === 'all'}
                            onChange={handleFilterRadioChange}
                            className={styles.filterRadio}
                        />
                        All
                    </label>

                    <label
                        htmlFor='show-incomplete'
                        data-selected={(props.currentFilter === 'incomplete').toString()}
                        className={styles.filterLabel}
                    >
                        <input
                            type='radio'
                            name='show'
                            id='show-incomplete'
                            value='incomplete'
                            checked={props.currentFilter === 'incomplete'}
                            onChange={handleFilterRadioChange}
                            className={styles.filterRadio}
                        />
                        Doing
                    </label>

                    <label
                        htmlFor='show-complete'
                        data-selected={(props.currentFilter === 'complete').toString()}
                        className={styles.filterLabel}
                    >
                        <input
                            type='radio'
                            name='show'
                            id='show-complete'
                            value='complete'
                            checked={props.currentFilter === 'complete'}
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
