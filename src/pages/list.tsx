
import styles from '@/styles/ListPage.module.css'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MouseEvent, useEffect, useState } from 'react'

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import type { Task } from '@/types/task'

import { useTaskList } from '@/hooks/tasks'

import { TaskListMenu } from '@/modules/tasks/listmenu'
import { TaskList } from '@/modules/tasks/list'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ListPage() {

    const router = useRouter();

    const supabase = useSupabaseClient();
    const user = useUser();

    const taskList = useTaskList([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleSignoutButton = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        router.push('/signin');

        const { error } = await supabase.auth.signOut();

        if (error) alert(error);
    };

    // Runs when user state changes
    useEffect(() => {
        // Request initial tasks from database
        const getUserTasks = async () => {
            // Request tasks from the database
            const { data, error } = await supabase
                .from('tasks')
                .select('id, task_text, complete')
                .eq('user_id', user?.id)

            if (error) {
                setError(error.message);
                return
            }

            if (!data) {
                setError('No data recieved from database in getUserItems()');
                return
            }

            // Sort data by when it was created
            data.sort((a, b) => {
                return a.id - b.id;
            });

            // Map each database row to a Task object and set taskList state
            taskList.setTasks(
                data.map((taskData) => {
                    return {
                        id: taskData.id,
                        text: taskData.task_text,
                        complete: taskData.complete,
                    }
                })
            );

            setLoading(false);
        };

        // Get inital user tasks
        if (user) getUserTasks();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Create a new task and add to server database and taskList client state
    const addTask = async (newTaskText: string, newTaskComplete: boolean = false) => {
        // Insert new task in database and return a new Task object
        const { data, error } = await supabase
            .from('tasks')
            .insert({
                user_id: user?.id,
                task_text: newTaskText,
                complete: newTaskComplete
            })
            .select()
            .single();

        if (error) {
            setError(error.message);
            return;
        }

        if (!data) {
            setError('No data recieved from database in addItem()');
            return;
        }

        // Add new task to taskList client state
        // Task must be added to state after server request because
        // the tasks' id property is generated on the server
        taskList.addTask({
            id: data.id,
            text: data.task_text,
            complete: data.complete,
        });
    };

    // Remove a task from server database and taskList client state
    const removeTask = async (selectedTask: Task) => {
        // Delete task from database
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id);

        if (error) {
            setError(error.message);
            return;
        }

        // Remove task from taskList state
        taskList.removeTask(selectedTask);
    };

    // Toggle a tasks' complete property in server database and taskList client state
    const toggleTaskComplete = async (selectedTask: Task) => {
        // Update is_complete property in database
        const { error } = await supabase
            .from('tasks')
            .update({
                complete: !selectedTask.complete,
            })
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id);

        if (error) {
            setError(error.message);
            return;
        }

        // Toggle complete in taskList state
        taskList.toggleTaskComplete(selectedTask);
    };

    // Update a tasks' text property in server database and taskList client state
    const editTaskText = async (selectedTask: Task, newTaskText: string) => {
        // Update task_text property in database
        const { error } = await supabase
            .from('tasks')
            .update({
                task_text: newTaskText,
            })
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id)

        if (error) {
            setError(error.message);
            return;
        }

        // Update text property in taskList state
        taskList.editTaskText(selectedTask, newTaskText);
    };

    // Delete every task where 'complete === true' in server database and taskList client state
    const clearCompleteTasks = async () => {
        // Delete complete tasks in database
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('user_id', user?.id)
            .eq('complete', true);

        if (error) {
            setError(error.message);
            return;
        }

        // Remove complete tasks from taskList state
        taskList.clearCompleteTasks();
    };

    // Delete every task owned by the user in server database and taskList client state
    const clearAllTasks = async () => {
        // Delete all user tasks in databse
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('user_id', user?.id);

        if (error) {
            setError(error.message);
            return;
        }

        // Remove all tasks from taskList client state
        taskList.clearAllTasks();
    };

    if (!user) {
        return (
            <>
                <Head>
                    <title>Done</title>
                    <meta name='description' content='Get stuff done.' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                    <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                    <link rel='manifest' href='/site.webmanifest' />
                </Head>

                <div className={styles.page}>

                    <Header>
                        <Link href='/signin' className={styles.headerButton}>Sign In</Link>
                        <Link href='/signup' className={styles.headerButton}>Sign Up</Link>
                    </Header>

                    <main className={styles.main}>
                        {error && <p className={styles.errorMessage}>{error}</p>}
                        {!error && <p className={styles.infoMessage}>No user session was found, please sign in or create an account.</p>}
                    </main>

                    <Footer />
                </div>
            </>
        );
    }

    // TODO move loading state into each component
    return (
        <>
            <Head>
                <title>Done</title>
                <meta name='description' content='Get stuff done.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <div className={styles.page}>

                <Header>
                    <p className={styles.headerUsername}>{user.email}</p>
                    <button onClick={handleSignoutButton} className={styles.headerButton}>Sign Out</button>
                </Header>


                {error &&
                    <main className={styles.main}>
                        <p className={styles.errorMessage}>{error}</p>
                    </main>
                }

                {!error &&
                    <main className={styles.main}>
                        <TaskListMenu
                            loading={loading}
                            addTask={addTask}
                            searchValue={taskList.searchValue}
                            setSearchValue={taskList.setSearchValue}
                            currentFilter={taskList.currentFilter}
                            setCurrentFilter={taskList.setCurrentFilter}
                            clearCompleteTasks={clearCompleteTasks}
                            clearAllTasks={clearAllTasks}
                        />
                        <TaskList
                            loading={loading}
                            tasks={taskList.tasks}
                            removeTask={removeTask}
                            editTaskText={editTaskText}
                            toggleTaskComplete={toggleTaskComplete}
                        />
                    </main>
                }

                <Footer />
            </div>
        </>
    );
};
