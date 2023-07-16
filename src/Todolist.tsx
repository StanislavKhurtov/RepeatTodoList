import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";


type TodolistType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType

}


export const Todolist = (props: TodolistType) => {

    let [newTitle, setNewTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    const addTask = () => {
        if (newTitle.trim() !== "") {
            props.addTask(props.id, newTitle.trim())
            setNewTitle("")
        } else {
            setError("Title is requared");
        }

    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTitle.trim() !== "") {
            if (e.key === "Enter") {
                props.addTask(props.id, newTitle.trim())
                setNewTitle("")
            }
        } else {
            setError("Title is requared");
        }


    };

    const onAllClickHandler = () => props.changeFilter(props.id, 'all');

    const onActiveClickHandler = () => props.changeFilter(props.id, 'active');

    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='errorMessage'>{error}</div>}
            </div>
            <div>
                <ul>
                    {props.tasks.map(el => {

                        const removeTask = () => props.removeTask(props.id, el.id);

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(props.id, el.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={el.id} className={el.isDone ? "isDone" : ''}>
                                <button onClick={removeTask}>x</button>
                                <input type="checkbox" checked={el.isDone}
                                       onChange={onChangeHandler}/><span>{el.title}</span>
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