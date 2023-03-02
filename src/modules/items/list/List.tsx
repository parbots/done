
import styles from './List.module.css'

import type { Item } from 'types/item';

import { ListItem } from '@modules/items/item'

type ListProps = {
    items: Item[];
    toggleCompleteItem: (selectedItem: Item) => void;
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
                        toggleComplete={() => {props.toggleCompleteItem(item)}}
                    />
                );
            })}
        </ul>
    );
};

