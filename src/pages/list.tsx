
import Head from 'next/head'
import Link from 'next/link'

import { useState, useEffect } from 'react'

import styles from '@styles/ListPage.module.css'

import { Footer } from '@components/footer'

import type { Item, Filter } from 'types/item'

import { ListMenu } from '@modules/items/menu'
import { List } from '@modules/items/list'

export default function ListPage() {

    const [items, setItems] = useState<Item[]>([]);

    // TODO: use library for random IDs
    const [itemID, setItemID] = useState(0);

    // Insert a new item at the end of the list
    const addItem = (itemText: string) => {
        setItems([
            ...items,
            { id: itemID, text: itemText, complete: false }
        ]);

        // temp
        setItemID(itemID + 1);
    };

    const removeItem = (selectedItem: Item) => {
        setItems(
            items.filter((item) => {
                return item !== selectedItem;
            })
        );
    };

    const toggleCompleteItem = (selectedItem: Item) => {
        setItems(
            items.map((item) => {
                if (item === selectedItem) item.complete = !item.complete;
                return item;
            })
        );
    };

    const editItem = (selectedItem: Item, newText: string) => {
        setItems(
            items.map((item) => {
                if (item === selectedItem) item.text = newText;
                return item;
            })
        );
    };

    const clearItems = () => {
        setItems([]);
    };

    const clearCompleteItems = () => {
        setItems(
            items.filter((item) => {
                return !item.complete;
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
                <meta name='description' content='Get stuff done.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>done</h2>

                    <nav className={styles.headerNav}>
                        <Link href='/' className={styles.headerNavLink}>Home</Link>
                    </nav>
                </header>

                <main className={styles.main}>
                    <ListMenu
                        addItem={addItem}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        currentFilter={currentFilter}
                        setCurrentFilter={setCurrentFilter}
                        clearCompleteItems={clearCompleteItems}
                        clearItems={clearItems}
                    />
                    <List items={searchedItems} removeItem={removeItem} editItem={editItem} toggleCompleteItem={toggleCompleteItem} />
                </main>

                <Footer />
            </div>
        </>
    )
}
