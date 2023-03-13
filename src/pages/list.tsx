
import Head from 'next/head'
import { useRouter } from 'next/router'

import { MouseEvent, useEffect, useState } from 'react'

import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import styles from '@styles/ListPage.module.css'

import { useList } from '@hooks/list'

import type { Item } from 'types/item'

import { ListMenu } from '@modules/items/menu'
import { List } from '@modules/items/list'

import { Footer } from '@components/footer'

export default function ListPage() {

    const router = useRouter();

    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();

    const list = useList([]);

    const [loading, setLoading] = useState<boolean>(false);

    const handleSignoutButton = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const { error } = await supabase.auth.signOut();

        // TODO add error handling on signout
        if (error) alert(error.message);

        router.push('/');
    };

    // Runs on page load
    useEffect(() => {
        // If no user session is active, redirect to signup page
        if (!session) {
            router.push('/');
            return;
        }

        // Get inital user items
        getUserItems();
    }, []);

    const getUserItems = async () => {
        try {
            setLoading(true);

            // Request items from the database
            const { data, error } = await supabase
                .from('items')
                .select('id, item_text, is_complete')
                .eq('user_id', user?.id)

            if (error) alert(error.message);

            if (!data) {
                alert('No data retrieved from getUserItems()!');
                return;
            }

            // Map each database row to an Item object and set list state
            list.setItems(
                data.map((item) => {
                    return {
                        id: item.id,
                        text: item.item_text,
                        complete: item.is_complete,
                    }
                })
            );
        }
        finally {
            setLoading(false);
        }
    };

    // Create a new item and add to database and list state
    const addItem = async (newItemText: string, newItemComplete: boolean = false) => {
        try {
            // Insert new item in database and return a new item object
            const { data, error } = await supabase
                .from('items')
                .insert({
                    user_id: user?.id,
                    item_text: newItemText,
                    is_complete: newItemComplete
                })
                .select()
                .single();

            if (error) alert(error.message);

            if (!data) {
                alert('No data retrieved from addItem()!');
                return;
            }

            // Add new item to list state
            // Item must be added to state after server request because
            // the item's id property is generated on the server
            list.addItem({
                id: data.id,
                text: data.item_text,
                complete: data.is_complete,
            });

        }
        finally { }
    };

    // Remove an item from database and list state
    const removeItem = async (selectedItem: Item) => {
        try {
            // Remove item from list state
            list.removeItem(selectedItem);

            // Delete item from database
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('user_id', user?.id)
                .eq('id', selectedItem.id);

            if (error) alert(error.message);
        }
        finally { }
    };

    // Toggle an item's complete property in database and list state
    const toggleItemComplete = async (selectedItem: Item) => {
        try {
            // Toggle complete in list state
            list.toggleItemComplete(selectedItem);

            // Update is_complete property in database
            const { error } = await supabase
                .from('items')
                .update({
                    is_complete: !selectedItem.complete,
                })
                .eq('id', selectedItem.id);

            if (error) alert(error.message);
        }
        finally {
        }
    };

    // Update an item's text property in database and list state
    const editItemText = async (selectedItem: Item, newItemText: string) => {
        try {
            // Update text property in list state
            list.editItemText(selectedItem, newItemText);

            // Update item_text property in database
            const { error } = await supabase
                .from('items')
                .update({
                    item_text: newItemText,
                })
                .eq('id', selectedItem.id)

            if (error) alert(error);
        }
        finally { }
    };

    // Delete every item where 'complete=true' in database and list state
    const clearCompleteItems = async () => {
        try {
            // Remove complete items from list state
            list.clearCompleteItems();

            // Delete complete items in database
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('user_id', user?.id)
                .eq('is_complete', true);

            if (error) alert(error.message);
        }
        finally { }
    };

    // Delete every item owned by the user in database and list state
    const clearAllItems = async () => {
        try {
            // Remove all items from list state
            list.clearAllItems();

            // Delete all items in databse
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('user_id', user?.id);

            if (error) alert(error.message);
        }
        finally { }
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
                        <p className={styles.headerNavUsername}>{session?.user.email}</p>
                        <button onClick={handleSignoutButton} className={styles.headerNavButton}>Sign Out</button>
                    </nav>
                </header>

                <main data-loading={loading.toString()} className={styles.main}>
                    <ListMenu
                        addItem={addItem}
                        searchValue={list.searchValue}
                        setSearchValue={list.setSearchValue}
                        currentFilter={list.currentFilter}
                        setCurrentFilter={list.setCurrentFilter}
                        clearCompleteItems={clearCompleteItems}
                        clearItems={clearAllItems}
                    />
                    <List
                        items={list.items}
                        removeItem={removeItem}
                        editItemText={editItemText}
                        toggleItemComplete={toggleItemComplete}
                    />
                </main>

                <Footer />
            </div>
        </>
    )
}
