import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type TodolistType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, id: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = (props: TodolistType) => {

    const onAllClickHandler = () => props.changeFilter(props.id, 'all');

    const onActiveClickHandler = () => props.changeFilter(props.id, 'active');

    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    };

    const addTask = (newTitle: string) => {
        props.addTask(props.id, newTitle)
    };

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3>
                <EditebleSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton size="small" onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <ul>
                    {props.tasks.map(el => {

                        const removeTask = () => props.removeTask(props.id, el.id);

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(props.id, el.id, e.currentTarget.checked)
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(props.id, el.id, newValue)
                        }

                        return (
                            <li key={el.id} className={el.isDone ? "isDone" : ''}>
                                <input type="checkbox" checked={el.isDone}
                                       onChange={onChangeHandler}/>
                                <EditebleSpan title={el.title} onChange={onChangeTitleHandler}/>
                                <IconButton size="small" onClick={removeTask}>
                                    <Delete />
                                </IconButton>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}


