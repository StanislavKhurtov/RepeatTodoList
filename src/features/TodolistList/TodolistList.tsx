import { useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { TaskStatuses } from '@/api/todolist-api'
import { TasksStateType } from '@/app/App'
import { useAppSelector } from '@/app/store'
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
  changeTodolistTitleTC,
  fetchTodolist,
  removeTodolistTC,
  todolistAction,
} from '@/features/TodolistList/Todolist/todolists-reducer'
import { useAppDispatch } from '@/hooks/useAppDispatch'

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
    (id: string, title: string) => {
      dispatch(addTaskTC(id, title))
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
    (id: string, filter: FilterPropsType) => {
      dispatch(todolistAction.changeTodolistFilter({ filter, id }))
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
    (id: string, title: string) => {
      dispatch(changeTodolistTitleTC(id, title))
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
