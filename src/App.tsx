import React, {useReducer} from 'react';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Header} from "./components/Header/header";
import {PlusSquareOutline} from "./assets";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";

export type FilterPropsType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterPropsType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export const App = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, title))
    }

//todo
    const changeFilter = (todolistId: string, filter: FilterPropsType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
    }
    const addTodolist = (title: string) => {
        dispatchToTasks(addTodolistAC(title))
        dispatchToTodolists(addTodolistAC(title))
    }
    const removeTodolist = (id: string) => {
        dispatchToTasks(removeTodolistAC(id))
        dispatchToTodolists(removeTodolistAC(id))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">
            <Header/>
            <div className="home__container">
                <AddItemForm addItem={addTodolist} label={'New Todolist'}
                             trigger={<PlusSquareOutline className={'icon'}/>}/>
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



