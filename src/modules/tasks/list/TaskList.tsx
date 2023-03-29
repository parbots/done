
import styles from './TaskList.module.css'

import type { Task } from '@/types/task'

import { TaskListItem } from '@/modules/tasks/list/item'

type TaskListProps = {
    loading: boolean;
    tasks: Task[];
    removeTask: (selectedTask: Task) => void;
    toggleTaskComplete: (selectedTask: Task) => void;
    editTaskText: (selectedTask: Task, newTaskText: string) => void;
};

export const TaskList = (props: TaskListProps) => {

    const taskListItems = props.tasks.map((task) => {
        return (
            <TaskListItem
                key={task.id}
                text={task.text}
                complete={task.complete}
                toggleSelfComplete={() => props.toggleTaskComplete(task)}
                editSelfText={(newTaskText: string) => props.editTaskText(task, newTaskText)}
                removeSelf={() => props.removeTask(task)}
            />
        );
    })

    if (props.loading) {
        return (
            <section className={styles.loadingSection}>
                <p className={styles.loadingMessage}>Loading...</p>
            </section>
        );
    }

    return (
        <ul className={styles.list}>
            {taskListItems}
        </ul>
    );
};

