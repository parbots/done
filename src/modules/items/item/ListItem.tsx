
import { ChangeEvent, KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'

import styles from './ListItem.module.css'

import TextareaAutosize from 'react-textarea-autosize'

type ListItemProps = {
    complete: boolean;
    text: string;
    toggleSelfComplete: () => void;
    editSelfText: (newText: string) => void;
    removeSelf: () => void;
}

// TODO use paragraph element for item text and switch to input element on click
export const ListItem = (props: ListItemProps) => {
    const textInputRef = useRef<HTMLTextAreaElement>(null);
    const [textInput, setTextInput] = useState<string>(props.text);

    const handleTextInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();

        setTextInput(event.target.value);
    };

    const submitText = () => {
        if (textInput === '' || textInput[0] === ' ') {
            setTextInput(props.text);
        }
        else {
            props.editSelfText(textInput);
        }
    };

    const handleTextInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            textInputRef.current?.blur();
        }
    };

    return (
        <li data-complete={props.complete.toString()} className={styles.item}>
            <input
                type='checkbox'
                checked={props.complete}
                onChange={() => props.toggleSelfComplete()}
                className={styles.itemCheckbox}
            />

            <TextareaAutosize
                minRows={1}
                maxLength={80}
                ref={textInputRef}
                value={textInput}
                onChange={handleTextInput}
                onBlur={submitText}
                onKeyDown={handleTextInputKeyDown}
                className={styles.itemTextInput}
            />

            <button onClick={() => props.removeSelf()} className={styles.removeItemButton}>Remove</button>
        </li>
    );
};

