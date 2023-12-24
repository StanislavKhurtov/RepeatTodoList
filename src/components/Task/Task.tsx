import clsx from "clsx";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import Trash from "../../assets/trash";
import React, {ChangeEvent} from "react";
import {TaskStatuses, TaskType} from '../../api/todolist-api';


type TaskProps = {
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    task: TaskType

}
export const Task = React.memo((props: TaskProps) => {
    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)
    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed :TaskStatuses.New)
    }

    return <div key={props.task.id}
                className={clsx('todo__item', 'item', {'isDone': props.task.status === TaskStatuses.Completed})}>
        <input
            type="checkbox"
            checked={props.task.status === TaskStatuses.Completed}
            className={'todo__input'}
            onChange={onChangeHandler}
        />
        <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
        <button className={'item__btn'} onClick={onClickHandler}>{<Trash className={'iconDelete'}/>}</button>
    </div>
})