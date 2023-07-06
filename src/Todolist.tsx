import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    сhangeTaskTitle:(todolistId:string, id:string, newValue:string) => void
    ChangeTodolistTitle: (id:string, title: string) => void
}


export const Todolist = (props: PropsType) => {
    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const ChangeTodolistTitle = (title:string) => {
      props.ChangeTodolistTitle(props.id, title)
    }

    return (
        <div>
            <h3>
                <EditebleSpan title={props.title} onChange={ChangeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(el => {
                    const onClickHandler = () => props.removeTask(el.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.сhangeTaskTitle(props.id, el.id, newValue);
                    }

                    return (
                        <li key={el.id} className={!el.isDone ? 'isDone' : ""}>
                            <button onClick={onClickHandler}>x</button>
                            <input
                                type="checkbox"
                                onChange={onChangeStatusHandler}
                                checked={el.isDone}
                            />
                            <EditebleSpan onChange={onChangeTitleHandler} title={el.title}/>
                        </li>
                    );
                })}

            </ul>
            <div className={'buttons'}>
                <button className={props.filter === "all" ? "activeFilter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "activeFilter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "activeFilter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}



