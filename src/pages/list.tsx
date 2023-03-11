
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MouseEvent } from 'react'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import styles from '@styles/ListPage.module.css'

import { useList } from '@hooks/list'

import { ListMenu } from '@modules/items/menu'
import { List } from '@modules/items/list'

import { Footer } from '@components/footer'

export default function ListPage() {

    const router = useRouter();

    const supabase = useSupabaseClient();
    const session = useSession();

    const list = useList([]);

    const handleSignoutButton = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const { error } = await supabase.auth.signOut();

        if (error) alert(error.message);

        router.push('/');
    };

    // TODO return redirect if session is null

    return (
        <>
            <Head>
                <title>Done</title>
                <meta name='description' content='Get stuff done.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>done</h2>

                    {!session &&
                        <nav className={styles.headerNav}>
                            <Link href='/signin' className={styles.headerNavLink}>Sign In</Link>
                            <Link href='/signup' className={styles.headerNavLink}>Sign Up</Link>
                        </nav>
                    }

                    {session &&
                        <nav className={styles.headerNav}>
                            <p className={styles.headerNavUsername}>{session.user.email}</p>
                            <button onClick={handleSignoutButton} className={styles.headerNavButton}>Sign Out</button>
                        </nav>
                    }
                </header>

                {!session &&
                    <main className={styles.main}>
                    </main>
                }

                {session &&
                    <main className={styles.main}>
                        <ListMenu
                            addItem={list.addItem}
                            searchValue={list.searchValue}
                            setSearchValue={list.setSearchValue}
                            currentFilter={list.currentFilter}
                            setCurrentFilter={list.setCurrentFilter}
                            clearCompleteItems={list.clearCompleteItems}
                            clearItems={list.clearItems}
                        />
                        <List
                            items={list.items}
                            removeItem={list.removeItem}
                            editItem={list.editItem}
                            toggleCompleteItem={list.toggleItemComplete}
                        />
                    </main>
                }
                <Footer />
            </div>
        </>
    )
}
