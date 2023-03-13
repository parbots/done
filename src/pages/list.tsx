
import Head from 'next/head'
import { useRouter } from 'next/router'

import { MouseEvent, useEffect } from 'react'

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

            const { data, error } = await supabase
                .from('items')
                .select('id, item_text, is_complete')
                .eq('user_id', user?.id)

            if (error) alert(error.message);

            if (!data) {
                alert('No data retrieved!');
                return;
            }

            const items: Item[] = data.map((item: { id: number, item_text: string, is_complete: boolean }) => {
                return {
                    id: item.id,
                    text: item.item_text,
                    complete: item.is_complete
                };
            });

            list.setItems(items);
        }
        finally {}
    };

    const updateItems = async () => {
        try {
            const { data, error } = await supabase
                .from('items')
                .select('id, item_text, is_complete')
                .eq('user_id', user?.id);

            if (error) alert(error.message);

            if (!data) {
                alert('No data retrieved!');
                return;
            }

            const items: Item[] = data.map((item) => {
                return {
                    id: item.id,
                    text: item.item_text,
                    complete: item.is_complete
                };
            });

            list.setItems(items);
        }
        finally {}
    };

    const addItem = async (newItemText: string, newItemComplete: boolean = false) => {
        try {
            const { error } = await supabase
                .from('items')
                .upsert({
                    user_id: user?.id,
                    item_text: newItemText,
                    is_complete: newItemComplete
                });

            if (error) alert(error.message);

            await updateItems();
        }
        catch (error) {
            alert(error);
        }
    };

    const removeItem = async (selectedItem: Item) => {
        try {
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('user_id', user?.id)
                .eq('id', selectedItem.id);

            if (error) alert(error.message);
        }
        finally {
            list.removeItem(selectedItem);
        }
    };

    const toggleItemComplete = async (selectedItem: Item) => {
        try {
            const { error } = await supabase
                .from('items')
                .update({
                    is_complete: !selectedItem.complete,
                })
                .eq('id', selectedItem.id);

            if (error) alert(error.message);
        }
        finally {
            list.toggleItemComplete(selectedItem);
        }
    };

    const editItemText = async (selectedItem: Item, newItemText: string) => {
        try {
            const { error } = await supabase
                .from('items')
                .update({
                    item_text: newItemText,
                })
                .eq('id', selectedItem.id)

            if (error) alert(error);
        }
        finally {
            list.editItemText(selectedItem, newItemText);
        }
    };

    const clearCompleteItems = async () => {
        try {
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('user_id', user?.id)
                .eq('is_complete', true);

            if (error) alert(error.message);
        }
        finally {
            list.clearCompleteItems();
        }
    };

    const clearAllItems = async () => {
        try {
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('user_id', user?.id);

            if (error) alert(error.message);
        }
        finally {
            list.clearAllItems();
        }
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

                <main className={styles.main}>
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
