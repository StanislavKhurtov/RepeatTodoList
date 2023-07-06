import React from "react";

type EditeblespanType = {
    title: string
}
export const EditebleSpan = (props: EditeblespanType) => {


    return (
        <span>{props.title}</span>
    );
}