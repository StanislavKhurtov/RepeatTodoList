import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'completed' | 'active';

export const App = () => {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'Angular', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>("all")

    const removeTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id));
    };

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    };

    let taskForTodolist = tasks;

    if (filter === 'completed') {
        taskForTodolist = tasks.filter(el => el.isDone === true)
    }

    if (filter === 'active') {
        taskForTodolist = tasks.filter(el => el.isDone === false)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}