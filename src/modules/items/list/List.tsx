
import styles from './List.module.css'

import { Item } from '@modules/items/item'

type ListProps = {
    items: {text: string, complete: boolean}[];
};

export const List = (props: ListProps) => {
    return (
        <ul className={styles.list}>
            {props.items.map((item) => {
                return (
                    <Item
                        key={item.text}
                        text={item.text}
                        complete={item.complete}
                    />
                );
            })}
        </ul>
    );
};

