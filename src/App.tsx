import React, {useCallback} from 'react';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Header} from "./components/Header/header";
import {PlusSquareOutline} from "./assets";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
//task
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [])

//todo
    const changeFilter = useCallback((todolistId: string, filter: FilterPropsType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [])

    return (
        <div className="App">
            <Header/>
            <div className="home__container">
                <AddItemForm
                    addItem={addTodolist}
                    label={'New Todolist'}
                    trigger={<PlusSquareOutline className={'icon'}/>}
                />
                {todolists.map(todolist => {
                    let taskForTodolist = tasks[todolist.id];
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



