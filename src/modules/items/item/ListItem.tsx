
import { useState } from 'react';

import styles from './ListItem.module.css';

type ListItemProps = {
    complete: boolean;
    text: string;
}

export const ListItem = (props: ListItemProps) => {

    const [complete, setComplete] = useState<boolean>(props.complete);

    return (
        <li className={styles.item}>
            <input type="checkbox" checked={complete} onChange={() => {setComplete((prev) => !prev)}} className={styles.itemCheckbox} />
            <p className={styles.itemText}>{props.text}</p>
        </li>
    );
};

