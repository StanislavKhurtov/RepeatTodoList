import React, {useCallback, useEffect} from 'react';
import {Todolist} from '../Todolist';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Header} from "../components/Header/header";
import {PlusSquareOutline} from "../assets";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolist,
    FilterPropsType,
    removeTodolistTC,
    TodolistDomainType,
} from "../state/todolists-reducer";
import {addTaskTC, changeTaskTitleAC, removeTaskTC, updateTaskStatusTC} from "../state/task-reducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {useAppDispatch, useAppSelector} from "../state/store";

export type TasksStateType = {
    [key: string]: TaskType[]
}
export const App = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(fetchTodolist)
    }, []);

//task
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskStatusTC(todolistId, taskId, status))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])

//todo
    const changeFilter = useCallback((todolistId: string, filter: FilterPropsType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

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



