import React, {ChangeEvent, useState} from "react";

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
            ? <input
                autoFocus
                value={newTitle}
                onChange={onChangeTitleHandler}
                onBlur={activeViewMode}
            />
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    );
}