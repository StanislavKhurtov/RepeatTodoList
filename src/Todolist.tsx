import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {
    const [newTasksTitle, setNewTaskTitle] = useState("");

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTasksTitle);
            setNewTaskTitle("");
        }
    };
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");


    const addTask = () => {
        if (newTasksTitle.trim() !== "") {
            props.addTask(newTasksTitle.trim());
            setNewTaskTitle("");
        }

    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTasksTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={addTask}>+
                </button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    const removeTask = () => props.removeTask(el.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked)
                    }


                    return (
                        <li key={el.id}>
                            <button onClick={removeTask}>x</button>
                            <input type="checkbox" onChange={onChangeHandler}/>
                            <span>{el.title}</span>
                        </li>
                    );
                })}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}