
import Head from 'next/head'
import { useRouter } from 'next/router'

import { MouseEvent } from 'react'

import styles from '@styles/ListPage.module.css'

import { useList } from '@hooks/list'

import { ListMenu } from '@modules/items/menu'
import { List } from '@modules/items/list'

import { Footer } from '@components/footer'

export default function ListPage() {

    const list = useList([]);

    const router = useRouter();

    const handleSignoutButton = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // TODO handle signout

        router.push('/');
    };

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

                    <nav className={styles.headerNav}>
                        <button onClick={handleSignoutButton} className={styles.headerNavButton}>Sign Out</button>
                    </nav>
                </header>

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

                <Footer />
            </div>
        </>
    )
}
