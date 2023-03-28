
import styles from '@/styles/ListPage.module.css'

import Head from 'next/head'

import { useEffect } from 'react'

import { useSupabaseTasks } from '@/hooks/supabaseTasks'

import { Header } from '@/components/header'
import { SignoutButton } from '@/components/signoutButton'

import { ButtonLink } from '@/components/buttonLink'
import { TaskListMenu } from '@/modules/tasks/listmenu'
import { TaskList } from '@/modules/tasks/list'

import { Footer } from '@/components/footer'

export default function ListPage() {

    const supabaseTasks = useSupabaseTasks('tasks');

    // Runs once when page mounts
    useEffect(() => {

        // Gets initial tasks from supabase or nothing if session is null
        supabaseTasks.getInitialTasks();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <ButtonLink href='/settings' text='Settings' />
                    <SignoutButton />
                </Header>

                {supabaseTasks.error &&
                    <main className={styles.main}>
                        <p className={styles.error}>{supabaseTasks.error}</p>
                    </main>
                }

                {!supabaseTasks.error &&
                    <main className={styles.main}>
                        <TaskListMenu
                            loading={supabaseTasks.loading}
                            addTask={supabaseTasks.addTask}
                            searchValue={supabaseTasks.searchValue}
                            setSearchValue={supabaseTasks.setSearchValue}
                            currentFilter={supabaseTasks.currentFilter}
                            setCurrentFilter={supabaseTasks.setCurrentFilter}
                            clearCompleteTasks={supabaseTasks.clearCompleteTasks}
                            clearAllTasks={supabaseTasks.clearAllTasks}
                        />

                        <TaskList
                            loading={supabaseTasks.loading}
                            tasks={supabaseTasks.tasks}
                            removeTask={supabaseTasks.removeTask}
                            editTaskText={supabaseTasks.editTaskText}
                            toggleTaskComplete={supabaseTasks.toggleTaskComplete}
                        />
                    </main>
                }

                <Footer />
            </div>
        </>
    );
};
