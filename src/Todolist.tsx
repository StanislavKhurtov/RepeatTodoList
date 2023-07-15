import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";


type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTitle: string) => void

}


export const Todolist = (props: TodolistType) => {

    const [newTitle, setNewTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onChangeHandler}
                />
                <button onClick={() => {
                    props.addTask(newTitle)
                    setNewTitle("")
                }}>+
                </button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(el => {
                        return (
                            <li key={el.id}>
                                <button onClick={() => props.removeTask(el.id)}>x</button>
                                <input type="checkbox" checked={el.isDone}/><span>{el.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Comleted
                </button>
            </div>
        </div>
    );
}