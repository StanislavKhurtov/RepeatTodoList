import React, {useState} from "react";

type EditeblespanType = {
    title: string
}
export const EditebleSpan = (props: EditeblespanType) => {

    const [editMode, setEditSpan] = useState(false)

    const activateEditMode = () => {
        setEditSpan(true)
    }

    const activateViewMode = () => {
        setEditSpan(false)
    }



    return (
        editMode
            ? <input autoFocus value={props.title} onBlur={activateViewMode}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
}