
import styles from './List.module.css'

import type { Item } from 'types/item';

import { ListItem } from '@modules/items/item'

type ListProps = {
    items: Item[];
    removeItem: (selectedItem: Item) => void;
    toggleCompleteItem: (selectedItem: Item) => void;
    editItem: (selectedItem: Item, newText: string) => void;
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
                        toggleCompleteSelf={() => props.toggleCompleteItem(item)}
                        editSelf={(newText: string) => props.editItem(item, newText)}
                        removeSelf={() => props.removeItem(item)}
                    />
                );
            })}
        </ul>
    );
};

