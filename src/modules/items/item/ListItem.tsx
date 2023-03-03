
import styles from './ListItem.module.css';

type ListItemProps = {
    complete: boolean;
    text: string;
    toggleComplete: () => void;
}

export const ListItem = (props: ListItemProps) => {
    return (
        <li className={styles.item}>
            <section className={styles.mainSection}>
                <input
                    type='checkbox'
                    checked={props.complete}
                    onChange={() => props.toggleComplete()}
                    className={styles.itemCheckbox}
                />
                <p className={styles.itemText}>
                    {props.text}
                </p>
            </section>

            <section className={styles.actionSection}>
                <button className={styles.editItemButton}>Edit</button>
                <button className={styles.removeItemButton}>Remove</button>
            </section>
        </li>
    );
};

