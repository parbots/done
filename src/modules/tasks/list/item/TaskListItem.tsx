
import styles from './TaskListItem.module.css'

import { ChangeEvent, KeyboardEvent,  useRef, useState } from 'react'

import TextareaAutosize from 'react-textarea-autosize'

type TaskListItemProps = {
    complete: boolean;
    text: string;
    toggleSelfComplete: () => void;
    editSelfText: (newTaskText: string) => void;
    removeSelf: () => void;
};

// TODO use paragraph element for item text and switch to input element on click
export const TaskListItem = (props: TaskListItemProps) => {

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
        <li data-complete={props.complete.toString()} className={styles.listItem}>
            <input
                type='checkbox'
                checked={props.complete}
                onChange={() => props.toggleSelfComplete()}
                className={styles.taskCheckbox}
            />

            <TextareaAutosize
                minRows={1}
                maxLength={80}
                spellCheck={false}
                ref={textInputRef}
                value={textInput}
                onChange={handleTextInput}
                onBlur={submitText}
                onKeyDown={handleTextInputKeyDown}
                className={styles.taskTextInput}
            />

            <button onClick={() => props.removeSelf()} className={styles.removeTaskButton}>Remove</button>
        </li>
    );
};

