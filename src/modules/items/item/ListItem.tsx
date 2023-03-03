
import { ChangeEvent, KeyboardEvent, MouseEvent, useRef, useState } from 'react';

import styles from './ListItem.module.css';

type ListItemProps = {
    complete: boolean;
    text: string;
    toggleCompleteSelf: () => void;
    editSelf: (newText: string) => void;
    removeSelf: () => void;
}

export const ListItem = (props: ListItemProps) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const [textInput, setTextInput] = useState<string>(props.text);

    const handleTextInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setTextInput(event.target.value);
    };

    const submitText = () => {
        if (textInput === '' || textInput[0] === ' ') {
            setTextInput(props.text);
        }
        else {
            props.editSelf(textInput);
        }
    };

    const handleTextInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            textInputRef.current?.blur();
        }
    };

    return (
        <li data-complete={props.complete.toString()} className={styles.item}>
            <section className={styles.mainSection}>
                <input
                    type='checkbox'
                    checked={props.complete}
                    onChange={() => props.toggleCompleteSelf()}
                    className={styles.itemCheckbox}
                />

                <input
                    type='text'
                    ref={textInputRef}
                    value={textInput}
                    onChange={handleTextInput}
                    onBlur={() => submitText()}
                    onKeyDown={handleTextInputKeyDown}
                    className={styles.itemTextInput}
                />
            </section>

            <section className={styles.actionSection}>
                <button onClick={() => props.removeSelf()} className={styles.removeItemButton}>Remove</button>
            </section>
        </li>
    );
};

