import React from "react";
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
    changeFilter:(value: FilterValuesType)=> void
}

export const Todolist = (props: PropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    const removeTask = () => props.removeTask(el.id)

                    return (
                        <li key={el.id}>
                            <button onClick={removeTask}>x</button>
                            <input type="checkbox"
                                   checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    );
                })}

            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
}