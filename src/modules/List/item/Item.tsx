
import { useState } from 'react';

import styles from './Item.module.css';

type ItemProps = {
    complete: boolean;
    text: string;
}

export const Item = (props: ItemProps) => {

    const [complete, setComplete] = useState<boolean>(props.complete);

    return (
        <li className={styles.item}>
            <input type="checkbox" checked={complete} onChange={() => {setComplete((prev) => !prev)}} className={styles.itemCheckbox} />
            <p className={styles.itemText}>{props.text}</p>
        </li>
    );
};

