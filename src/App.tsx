import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id:number
    title: string
    isDone:boolean
}

export const App = () => {

    let tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 1, title: 'JavaScript', isDone: true},
        {id: 1, title: 'React', isDone: false},
        {id: 1, title: 'TypeScript', isDone: false},
        {id: 1, title: 'Angular', isDone: false},
    ]

    let tasks2 = [
        {id: 1, title: 'Terminator', isDone: true},
        {id: 1, title: 'XXX', isDone: false},
        {id: 1, title: 'John Weak', isDone: false},

    ]


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="What to buy" tasks={tasks2}/>
        </div>
    );
}