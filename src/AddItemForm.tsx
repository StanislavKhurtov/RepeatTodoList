import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormProps = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormProps) => {

    const [newTasksTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            e.preventDefault(); // Предотвращение отправки пустой формы
            if (newTasksTitle.trim() !== "") {
                props.addItem(newTasksTitle.trim());
                setNewTaskTitle("");
            } else {
                setError("Title is required");
            }
        }
    };

    const addTask = () => {
        if (newTasksTitle.trim() !== "") {
            props.addItem(newTasksTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required")
        }
    };


    return (
        <div>
            <input
                value={newTasksTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button
                onClick={addTask}>+
            </button>
            {error && <div className="errorMessage">"Field is required"</div>}
        </div>
    );
}