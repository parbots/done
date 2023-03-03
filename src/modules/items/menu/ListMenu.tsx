
import { useState, FormEvent, ChangeEvent } from 'react';

import styles from './ListMenu.module.css';

import type { Filter } from 'types/item';

type ListMenuProps = {
    addItem: (itemName: string) => void;
    searchValue: string;
    setSearchValue: (newSearchValue: string) => void;
    currentFilter: Filter;
    setCurrentFilter: (newFilter: Filter) => void;
    clearCompleteItems: () => void;
    clearItems: () => void;
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

    return (
        <form onSubmit={handleFormSubmit} className={styles.menu}>
            <fieldset className={styles.addItemFieldset}>
                <input
                    type='text'
                    name='itemInput'
                    placeholder='Enter new todo...'
                    value={itemInputValue}
                    onChange={handleItemInputChange}
                    className={styles.itemInput}
                />
                <button type='submit' className={styles.addItemButton}>Add</button>
            </fieldset>

            <section className={styles.filterSection}>

                <label htmlFor='searchFieldset' className={styles.searchFieldsetLabel}>Search:</label>
                <fieldset id='searchFieldset' className={styles.searchFieldset}>
                    <input
                        type='text'
                        name='searchInput'
                        placeholder='Enter text...'
                        value={props.searchValue}
                        onChange={handleSearchInputChange}
                        className={styles.searchInput}
                    />
                </fieldset>

                <label htmlFor='filterFieldset' className={styles.filterFieldsetLabel}>Show:</label>
                <fieldset id='filterFieldset' className={styles.filterFieldset}>
                    <button
                        type='button'
                        data-selected={(props.currentFilter === 'all').toString()}
                        onClick={() => props.setCurrentFilter('all')}
                        className={styles.filterButton}
                    >
                        All
                    </button>

                    <button
                        type='button'
                        data-selected={(props.currentFilter === 'incomplete').toString()}
                        onClick={() => props.setCurrentFilter('incomplete')}
                        className={styles.filterButton}
                    >
                        Doing
                    </button>

                    <button
                        type='button'
                        data-selected={(props.currentFilter === 'complete').toString()}
                        onClick={() => props.setCurrentFilter('complete')}
                        className={styles.filterButton}
                    >
                        Done
                    </button>
                </fieldset>

                <label htmlFor='actionFieldset' className={styles.actionFieldsetLabel}>Clear:</label>
                <fieldset id='actionFieldset' className={styles.actionFieldset}>
                    <button
                        type='button'
                        onClick={() => { props.clearCompleteItems() }}
                        className={styles.actionButton}
                    >
                        Done
                    </button>

                    <button
                        type='button'
                        onClick={() => { props.clearItems() }}
                        className={styles.actionButton}
                    >
                        All
                    </button>
                </fieldset>
            </section>
        </form>
    );
};
