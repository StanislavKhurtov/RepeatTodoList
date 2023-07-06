import React, {useState} from "react";

type EditeblespanType = {
    title: string
}
export const EditebleSpan = (props: EditeblespanType) => {

    const [editMode, setEditSpan] = useState(false)

    return (
        editMode
        ? <input value={props.title}/>
        : <span>{props.title}</span>
    );
}