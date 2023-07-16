import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'completed' | 'active';

export const App = () => {


    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    };

    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    };

    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    };

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        setTodolist(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    };

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolists.filter(el => el.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks})
    };

    const todolistIs_1 = v1();
    const todolistIs_2 = v1();

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistIs_1, title: 'What to learn', filter: "all"},
        {id: todolistIs_2, title: 'What to buy', filter: "all"},
    ]);


    let [tasks, setTasks] = useState({
        [todolistIs_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},

        ],
        [todolistIs_2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    })


    return (
        <div className="App">

            {todolists.map((el) => {

                let taskForTodolist = tasks[el.id];

                if (el.filter === 'completed') {
                    taskForTodolist = taskForTodolist.filter(el => el.isDone === true)
                }

                if (el.filter === 'active') {
                    taskForTodolist = taskForTodolist.filter(el => el.isDone === false)
                }

                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />
                );
            })}
        </div>
    );
}