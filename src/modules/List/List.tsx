
import styles from './List.module.css'

import { Item } from '@modules/list/item';

export const List = () => {
    return (
        <ul className={styles.list}>
            <Item complete={false} text='Todo 1' />
            <Item complete={false} text='Todo 2' />
            <Item complete={true} text='Todo 3' />
        </ul>
    );
};

