import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'completed' | 'active';

export const App = () => {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'TypeScript', isDone: false},
        {id: 5, title: 'Angular', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>("all")

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id));
    };

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

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