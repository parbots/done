import Head from 'next/head'

import { useState } from 'react'

import styles from '@styles/HomePage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

import type { Item } from 'types/item'

import { ListMenu } from '@modules/items/menu'
import { List } from '@modules/items/list'

export default function HomePage() {

    const [items, setItems] = useState<Item[]>([]);

    // TODO: use library for random IDs
    const [itemID, setItemID] = useState(0);

    // Insert a new item at the beginning of the list
    const addItem = (itemText: string) => {
        setItems([{id: itemID, text: itemText, complete: false }, ...items]);
    
        // temp
        setItemID((prev) => {return prev + 1});
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
