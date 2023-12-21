import React, {useState} from 'react';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Header} from "./components/Header/header";
import Trash from "./assets/trash";

export type FilterPropsType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: FilterPropsType
}
type TasksStateType = {
    [key: string]: TaskType[]
}
export const App = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

//task
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const addTask = (todolistId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]
        })
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
        })
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title:string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)
        })
    }

//todo
    const changeFilter = (todolistId: string, filter: FilterPropsType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter} : el))
    }
    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        setTodolists([{id: newTodolistId, title, filter: 'all'}, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(el => el.id !== id))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
    }

    return (
        <div className="App">
            <Header/>
            <div className="home__container">
                <AddItemForm addItem={addTodolist} label={'New Todolist'} trigger={<Trash className={'icon'}/>}/>
                {todolists.map(todolist => {

                    let allTodolistsTasks = tasks[todolist.id];
                    let taskForTodolist = allTodolistsTasks;

                    if (todolist.filter === 'active') {
                        taskForTodolist = allTodolistsTasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        taskForTodolist = allTodolistsTasks.filter(task => task.isDone)
                    }

                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                })}
            </div>
        </div>
    );
}



