

import styles from './List.module.css'

export const List = () => {
    return (
        <ul className={styles.list}>
            <li className={styles.item}>
                <input type="checkbox" className={styles.itemCheckbox} />
                <p className={styles.itemText}>Todo 1</p>
            </li>
        </ul>
    );
};

