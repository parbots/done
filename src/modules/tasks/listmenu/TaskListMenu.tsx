
import styles from './TaskListMenu.module.css'

import { useState, FormEvent, ChangeEvent } from 'react'

import type { Filter } from '@/types/task'

type TaskListMenuProps = {
    loading: boolean;
    addTask: (newTaskText: string, newTaskComplete?: boolean) => void;
    searchValue: string;
    setSearchValue: (newSearchValue: string) => void;
    currentFilter: Filter;
    setCurrentFilter: (newFilter: Filter) => void;
    clearCompleteTasks: () => void;
    clearAllTasks: () => void;
};

// TODO add an infomessage component to show warnings and errors
// for example: max characters length of add item input
export const TaskListMenu = (props: TaskListMenuProps) => {

    const [taskInputValue, setTaskInputValue] = useState('');

    const handleTaskInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setTaskInputValue(event.target.value);
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (taskInputValue !== '' && taskInputValue[0] !== ' ') {
            props.addTask(taskInputValue.trim());

            setTaskInputValue('');
        }
    };

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        props.setSearchValue(event.target.value);
    };

    if (props.loading) {
        return (
            <section className={styles.loadingSection}>
                <p className={styles.loadingMessage}>Loading...</p>
            </section>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className={styles.menu}>
            <fieldset className={styles.addTaskFieldset}>
                <input
                    type='text'
                    placeholder='New task...'
                    value={taskInputValue}
                    maxLength={80}
                    onChange={handleTaskInputChange}
                    className={styles.taskInput}
                />
                <button type='submit' className={styles.addTaskButton}>Add</button>
            </fieldset>

            <section className={styles.filterSection}>

                <fieldset id='searchFieldset' className={styles.searchFieldset}>
                    <label htmlFor='searchFieldset' className={styles.searchFieldsetLabel}>Search:</label>

                    <input
                        type='text'
                        placeholder='Enter text...'
                        value={props.searchValue}
                        onChange={handleSearchInputChange}
                        className={styles.searchInput}
                    />
                </fieldset>

                <fieldset id='filterFieldset' className={styles.filterFieldset}>
                    <label htmlFor='filterFieldset' className={styles.filterFieldsetLabel}>Show:</label>

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

                <fieldset id='actionFieldset' className={styles.actionFieldset}>
                    <label htmlFor='actionFieldset' className={styles.actionFieldsetLabel}>Clear:</label>

                    <button
                        type='button'
                        onClick={() => { props.clearCompleteTasks() }}
                        className={styles.actionButton}
                    >
                        Done
                    </button>

                    <button
                        type='button'
                        onClick={() => { props.clearAllTasks() }}
                        className={styles.actionButton}
                    >
                        All
                    </button>
                </fieldset>
            </section>
        </form>
    );
};
