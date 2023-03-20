
import { useState, useEffect } from 'react'

import type { Task, Filter } from '@/types/task'

export const useTaskList = (initialTasks: Task[]) => {

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const [currentFilter, setCurrentFilter] = useState<Filter>('all');
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    const [searchValue, setSearchValue] = useState<string>('');
    const [searchedTasks, setSearchedTasks] = useState<Task[]>(filteredTasks);

    // Append a new task to the list and return the added task
    const addTask = (newTask: Task) => {
        setTasks([
            ...tasks,
            newTask
        ]);

        return newTask;
    };

    // Remove a task from the list and return the removed task
    const removeTask = (selectedTask: Task): Task => {
        setTasks(
            tasks.filter((task) => {
                return task !== selectedTask;
            })
        );

        return selectedTask;
    };

    // Toggle selected tasks' complete value
    const toggleTaskComplete = (selectedTask: Task) => {
        setTasks(
            tasks.map((task) => {
                if (task === selectedTask) task.complete = !task.complete;
                return task;
            })
        );
    };

    // Set new text value for selected task
    const editTaskText = (selectedTask: Task, newTaskText: string) => {
        setTasks(
            tasks.map((task) => {
                if (task === selectedTask) task.text = newTaskText;
                return task;
            })
        );
    };

    // Set the list to empty
    const clearAllTasks = () => {
        setTasks([]);
    };

    // Remove tasks where 'complete === true'
    const clearCompleteTasks = () => {
        setTasks(
            tasks.filter((task) => {
                return !task.complete;
            })
        );
    };

    // Filter items based on current filter whenever list or 
    // current filter change
    useEffect(() => {
        setFilteredTasks(
            tasks.filter((task) => {
                switch (currentFilter) {
                    case 'all':
                        return true;
                    case 'incomplete':
                        return !task.complete;
                    case 'complete':
                        return task.complete;
                    default:
                        return true;
                }
            })
        );
    }, [tasks, currentFilter]);

    // Filter items based on current search value whenever list,
    // current filter, or search value change
    useEffect(() => {
        setSearchedTasks(
            filteredTasks.filter((task) => {
                return task.text
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            })
        );
    }, [filteredTasks, searchValue]);

    return {
        tasks: searchedTasks,
        setTasks: (newTasks: Task[]) => { setTasks(newTasks); },

        addTask,
        removeTask,
        editTaskText,
        toggleTaskComplete,
        clearAllTasks,
        clearCompleteTasks,

        currentFilter,
        setCurrentFilter: (newFilter: Filter) => { setCurrentFilter(newFilter); },

        searchValue,
        setSearchValue: (newSearchValue: string) => { setSearchValue(newSearchValue); },
    };
};
