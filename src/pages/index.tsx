import Head from 'next/head'

import { useState, useEffect } from 'react'

import styles from '@styles/HomePage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

import type { Item, Filter } from 'types/item'

import { ListMenu } from '@modules/items/menu'
import { List } from '@modules/items/list'

export default function HomePage() {

    const [items, setItems] = useState<Item[]>([]);

    // TODO: use library for random IDs
    const [itemID, setItemID] = useState(0);

    // Insert a new item at the beginning of the list
    const addItem = (itemText: string) => {
        setItems([{ id: itemID, text: itemText, complete: false }, ...items]);

        // temp
        setItemID((prev) => { return prev + 1 });
    };

    const toggleCompleteItem = (selectedItem: Item) => {
        setItems(
            items.map((item) => {
                if (item === selectedItem) item.complete = !item.complete;
                return item;
            })
        );
    };

    const [currentFilter, setCurrentFilter] = useState<Filter>('all');
    const [filteredItems, setFilteredItems] = useState<Item[]>(items);

    useEffect(() => {
        setFilteredItems(
            items.filter((item) => {
                switch (currentFilter) {
                    case 'all':
                        return true;
                    case 'incomplete':
                        return !item.complete;
                    case 'complete':
                        return item.complete;
                }
            })
        );
    }, [items, currentFilter]);

    const [searchValue, setSearchValue] = useState('');
    const [searchedItems, setSearchedItems] = useState<Item[]>(items);

    useEffect(() => {
        setSearchedItems(
            filteredItems.filter((item) => {
                return item.text
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            })
        );
    }, [filteredItems, searchValue]);

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
                    <ListMenu
                        addItem={addItem}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        currentFilter={currentFilter}
                        setCurrentFilter={setCurrentFilter}
                    />
                    <List items={searchedItems} toggleCompleteItem={toggleCompleteItem} />
                </main>

                <Footer />
            </div>
        </>
    )
}
