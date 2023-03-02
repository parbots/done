import Head from 'next/head'

import { useState } from 'react'

import styles from '@styles/HomePage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

import type { Item } from 'types/item'

import { ListMenu } from '@modules/items/menu'
import { List } from '@modules/items/list'

export default function HomePage() {

    const [items, setItems] = useState<Item[]>([
        { text: 'Todo 1', complete: false },
        { text: 'Todo 2', complete: false },
        { text: 'Todo 3', complete: true },
    ]);

    const addItem = (itemText: string) => {
        setItems([...items, { text: itemText, complete: false }]);
    };

    return (
        <>
            <Head>
                <title>Done</title>
                <meta name="description" content="Get stuff done." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className={styles.page}>
                <Header />

                <main className={styles.main}>
                    <ListMenu addItem={addItem} />
                    <List items={items} />
                </main>

                <Footer />
            </div>
        </>
    )
}
