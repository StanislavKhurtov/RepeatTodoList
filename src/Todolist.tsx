import React from "react";
import {TaskType} from "./App";


type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
}


export const Todolist = (props: TodolistType) => {



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(el => {
                        return (
                            <li key={el.id}>
                                <button onClick={()=>props.removeTask(el.id)}>x</button>
                                <input type="checkbox" checked={el.isDone}/><span>{el.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Comleted</button>
            </div>
        </div>
    );
}