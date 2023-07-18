import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [newTitle, setNewTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError("Title is requared");
        }

    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTitle.trim() !== "") {
            if (e.key === "Enter") {
                props.addItem(newTitle.trim())
                setNewTitle("")
            }
        } else {
            setError("Title is requared");
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    return (
        <div>
            <input
                value={newTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <Button onClick={addTask} variant={"contained"} color={'primary'}>+</Button>
            {error && <div className='errorMessage'>{error}</div>}
        </div>
    );
}