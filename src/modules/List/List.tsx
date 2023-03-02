
import styles from './List.module.css'

import { Item } from '@modules/list/item';

export const List = () => {
    return (
        <ul className={styles.list}>
            <Item text='Todo 1' />
            <Item text='Todo 2' />
            <Item text='Todo 3' />
        </ul>
    );
};

