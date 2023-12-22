import clsx from "clsx";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import Trash from "../../assets/trash";
import React from "react";
import {TaskType} from "../../Todolist";

type TaskProps = {
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    task: TaskType

}
export const Task = React.memo((props: TaskProps) => {
    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)
    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }

    return <div key={props.task.id} className={clsx('todo__item', 'item', {'isDone': props.task.isDone})}>
        <input
            type="checkbox"
            checked={props.task.isDone}
            className={'todo__input'}
            onChange={(e) => {
                props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
            }}/>
        <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
        <button className={'item__btn'} onClick={onClickHandler}>{<Trash className={'icon'}/>}</button>
    </div>
})