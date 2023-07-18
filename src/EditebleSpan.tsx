import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditebleSpan = (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState("")

    const activeEditMode = () => {
        setEditMode(true)
        setNewTitle(props.title)
    };
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(newTitle);

    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                variant="standard"
                autoFocus
                value={newTitle}
                onChange={onChangeTitleHandler}
                onBlur={activeViewMode}
            />
            : <span onClick={activeEditMode}>{props.title}</span>
    );
}