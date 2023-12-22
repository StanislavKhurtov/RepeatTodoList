import React, {ChangeEvent, useState} from "react";


type Props = {
    title: string
    onChange: (title: string) => void
    className?:string
}
export const EditableSpan = React.memo((props: Props) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
            : <span onClick={activateEditMode}>{props.title}</span>
    )
})
