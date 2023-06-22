import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
    removeTodolist:(todolistID: string)=> void
}

export const Todolist = (props: PropsType) => {

    const [newTasksTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (newTasksTitle.trim() !== "") {
            props.addTask(newTasksTitle.trim(), props.id);
            setNewTaskTitle("");
        } else {
            setError("Title is required")
        }
    };


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTasksTitle, props.id);
            setNewTaskTitle("");
        }
    };
    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");

    const removeTodolist = () => {props.removeTodolist(props.id)}

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>

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
                    const onClickHandler = () => props.removeTask(el.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                    }


                    return (
                        <li key={el.id} className={!el.isDone ? 'isDone' : ""}>
                            <button onClick={onClickHandler}>x</button>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={el.isDone}
                                className={error ? "error" : ""}
                            />
                            <span>{el.title}</span>
                        </li>
                    );
                })}

            </ul>
            <div>
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