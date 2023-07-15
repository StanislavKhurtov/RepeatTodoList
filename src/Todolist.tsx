import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";


type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTitle: string) => void
    changeStatus: (id: string, isDone: boolean) => void

}


export const Todolist = (props: TodolistType) => {

    const [newTitle, setNewTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    const addTask = () => {
        props.addTask(newTitle)
        setNewTitle("")
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTitle)
            setNewTitle("")
        }
    };

    const onAllClickHandler = () => props.changeFilter('all');

    const onActiveClickHandler = () => props.changeFilter('active');

    const onCompletedClickHandler = () => props.changeFilter('completed');


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(el => {

                        const removeTask = () => props.removeTask(el.id);

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(el.id,e.currentTarget.checked )
                        }

                        return (
                            <li key={el.id}>
                                <button onClick={removeTask}>x</button>
                                <input type="checkbox" onChange={onChangeHandler}/><span>{el.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}