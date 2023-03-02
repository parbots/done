
import styles from './Item.module.css'

type ItemProps = {
    text: string;
}

export const Item = ({ text }: ItemProps) => {
    return (
        <li className={styles.item}>
            <input type="checkbox" className={styles.itemCheckbox} />
            <p className={styles.itemText}>{text}</p>
        </li>
    );
};

