import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter:FilterValuesType
}

export const Todolist = (props: PropsType) => {

    const [newTasksTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTasksTitle);
            setNewTaskTitle("");
        }
    };
    const onAllClickHandler = () => props.changeFilter(props.id,"all");
    const onActiveClickHandler = () => props.changeFilter(props.id,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.id,"completed");


    const addTask = () => {
        if (newTasksTitle.trim() !== "") {
            props.addTask(newTasksTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required")
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
                {error && <div className="errorMessage">"Field is required"</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                    const removeTask = () => props.removeTask(el.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked)
                    }


                    return (
                        <li key={el.id} className={!el.isDone ? 'isDone' : ""}>
                            <button onClick={removeTask}>x</button>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                className={error ? "error" : ""}
                            />
                            <span>{el.title}</span>
                        </li>
                    );
                })}

            </ul>
            <div>
                <button className={props.filter === "all" ? "activeFilter": ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "activeFilter": ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "activeFilter": ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}