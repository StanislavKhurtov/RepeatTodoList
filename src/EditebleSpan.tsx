import React, {ChangeEvent, useState} from "react";

type EditeblespanType = {
    title: string
    onChange:(newValue:string) => void
}
export const EditebleSpan = (props: EditeblespanType) => {

    const [editMode, setEditSpan] = useState(false)
    const [title, setTitle] = useState('')


    const activateEditMode = () => {
        setEditSpan(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditSpan(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={title}
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}
                autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
}