import { useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { TaskStatuses } from '@/api/todolist-api'
import { TasksStateType } from '@/app/App'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { PlusSquareOutline } from '@/assets'
import { AddItemForm } from '@/components/AddItemForm'
import { Todolist } from '@/features/TodolistList/Todolist/Todolist'
import {
  addTaskTC,
  removeTaskTC,
  updateTaskTC,
} from '@/features/TodolistList/Todolist/task-reducer'
import {
  FilterPropsType,
  TodolistDomainType,
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolist,
  removeTodolistTC,
} from '@/features/TodolistList/Todolist/todolists-reducer'

export const TodolistList = () => {
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodolist)
  }, [])

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

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
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
  )
}
