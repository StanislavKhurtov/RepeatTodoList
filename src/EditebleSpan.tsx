import React from "react";

type EditableSpanType = {
    title: string
}
export const EditebleSpan = (props: EditableSpanType) => {

    return (
        <span>{props.title}</span>
    );
}