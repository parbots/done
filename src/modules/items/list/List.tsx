
import styles from './List.module.css'

import type { Item } from 'types/item';

import { ListItem } from '@modules/items/item'

type ListProps = {
    items: Item[];
    removeItem: (selectedItem: Item) => void;
    toggleItemComplete: (selectedItem: Item) => void;
    editItemText: (selectedItem: Item, newText: string) => void;
};

export const List = (props: ListProps) => {
    return (
        <ul className={styles.list}>
            {props.items.map((item) => {
                return (
                    <ListItem
                        key={item.id}
                        text={item.text}
                        complete={item.complete}
                        toggleSelfComplete={() => props.toggleItemComplete(item)}
                        editSelfText={(newText: string) => props.editItemText(item, newText)}
                        removeSelf={() => props.removeItem(item)}
                    />
                );
            })}
        </ul>
    );
};

