import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'TypeScript', isDone: false},
        {id: 5, title: 'Angular', isDone: false},
    ])

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id));
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />

        </div>
    );
}