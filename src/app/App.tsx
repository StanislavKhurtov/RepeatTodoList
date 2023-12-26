import { useCallback, useEffect } from 'react'

import { Todolist } from '@/Todolist'
import { TaskStatuses, TaskType } from '@/api/todolist-api'
import { RequestStatusType } from '@/app/app-reducer'
import { AddItemForm } from '@/components/AddItemForm'
import { ErrorSnackbar } from '@/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '@/components/Header'
import { Linear } from '@/components/linear'
import { useAppDispatch, useAppSelector } from '@/state/store'
import { addTaskTC, removeTaskTC, updateTaskTC } from '@/state/task-reducer'
import {
  FilterPropsType,
  TodolistDomainType,
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolist,
  removeTodolistTC,
} from '@/state/todolists-reducer'

import { PlusSquareOutline } from '../assets'

export type TasksStateType = {
  [key: string]: TaskType[]
}
export const App = () => {
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolist)
  }, [dispatch])

  //task
  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(removeTaskTC(todolistId, taskId))
    },
    [dispatch]
  )
  const addTask = useCallback(
    (todolistId: string, title: string) => {
      dispatch(addTaskTC(todolistId, title))
    },
    [dispatch]
  )
  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todolistId, taskId, { status }))
    },
    [dispatch]
  )
  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { title }))
    },
    [dispatch]
  )

  //todo
  const changeFilter = useCallback(
    (todolistId: string, filter: FilterPropsType) => {
      dispatch(changeTodolistFilterAC(todolistId, filter))
    },
    [dispatch]
  )
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch]
  )
  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodolistTC(id))
  }, [])
  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleTC(todolistId, title))
    },
    [dispatch]
  )

  return (
    <div className={'App'}>
      <ErrorSnackbar />
      <Header />
      {status === 'loading' && <Linear className={'preloader'} />}
      <div className={'home__container'}>
        <AddItemForm
          addItem={addTodolist}
          label={'New Todolist'}
          trigger={<PlusSquareOutline className={'icon'} />}
        />
        {todolists.map(todolist => {
          const taskForTodolist = tasks[todolist.id]

          return (
            <Todolist
              addTask={addTask}
              changeFilter={changeFilter}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}
              entityStatus={todolist.entityStatus}
              filter={todolist.filter}
              id={todolist.id}
              key={todolist.id}
              removeTask={removeTask}
              removeTodolist={removeTodolist}
              tasks={taskForTodolist}
              title={todolist.title}
            />
          )
        })}
      </div>
    </div>
  )
}
