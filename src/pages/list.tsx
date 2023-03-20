
import styles from '@/styles/ListPage.module.css'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MouseEvent, useEffect } from 'react'

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'

import { useSupabaseTasks } from '@/hooks/supabaseTasks'

import { TaskListMenu } from '@/modules/tasks/listmenu'
import { TaskList } from '@/modules/tasks/list'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ListPage() {

    const router = useRouter();

    const supabase = useSupabaseClient();
    const { isLoading, session } = useSessionContext();

    const supabaseTasks = useSupabaseTasks();

    const handleSignoutButton = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        router.push('/signin');

        const { error } = await supabase.auth.signOut();

        if (error) alert(error);
    };

    // Runs once when component mounts
    useEffect(() => {
        supabaseTasks.getInitialTasks();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
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
                        <p className={styles.headerLoadingMessage}>Loading...</p>
                    </Header>

                    <main className={styles.main}>
                        <p className={styles.infoMessage}>Loading...</p>
                    </main>

                    <Footer />
                </div>
            </>
        );
    }

    if (!isLoading && !session) {
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
                        <p className={styles.infoMessage}>No user session was found, please sign in or create an account.</p>
                    </main>

                    <Footer />
                </div>
            </>
        );
    }

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
                    <p className={styles.headerUsername}>{session?.user.email}</p>
                    <button onClick={handleSignoutButton} className={styles.headerButton}>Sign Out</button>
                </Header>

                <main className={styles.main}>
                    <TaskListMenu
                        loading={supabaseTasks.loadingTasks}
                        addTask={supabaseTasks.addTask}
                        searchValue={supabaseTasks.searchValue}
                        setSearchValue={supabaseTasks.setSearchValue}
                        currentFilter={supabaseTasks.currentFilter}
                        setCurrentFilter={supabaseTasks.setCurrentFilter}
                        clearCompleteTasks={supabaseTasks.clearCompleteTasks}
                        clearAllTasks={supabaseTasks.clearAllTasks}
                    />
                    <TaskList
                        loading={supabaseTasks.loadingTasks}
                        tasks={supabaseTasks.tasks}
                        removeTask={supabaseTasks.removeTask}
                        editTaskText={supabaseTasks.editTaskText}
                        toggleTaskComplete={supabaseTasks.toggleTaskComplete}
                    />
                </main>

                <Footer />
            </div>
        </>
    );
};
