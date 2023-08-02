import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'completed' | 'active';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);

    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id));
    };

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title));
    };

    const changeTaskTitle = (todolistId: string, id: string, newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newValue));
    };

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone));
    };


    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    };

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    };

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    };

    const changeFilter = (todolistId: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    };


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container gap={10}>
                    {todolists.map((el) => {

                        let taskForTodolist = tasks[el.id];

                        if (el.filter === 'completed') {
                            taskForTodolist = taskForTodolist.filter(el => el.isDone === true)
                        }

                        if (el.filter === 'active') {
                            taskForTodolist = taskForTodolist.filter(el => el.isDone === false)
                        }

                        return (
                            <div>
                                <Grid item>
                                    <Paper style={{padding: "20px"}}>
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
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            </div>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}