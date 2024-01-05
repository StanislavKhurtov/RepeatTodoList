import { useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { TasksStateType } from '@/app/App'
import { useAppSelector } from '@/app/store'
import { PlusSquareOutline } from '@/assets'
import { AddItemForm } from '@/common/components/AddItemForm'
import { TaskStatuses } from '@/common/enums/common.enums'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Todolist } from '@/features/TodolistList/Todolist/Todolist'
import { tasksThunks } from '@/features/TodolistList/model/task-reducer'
import { selectTasks } from '@/features/TodolistList/model/tasks.selectors'
import { selectTodolists } from '@/features/TodolistList/model/todolists.selectors'
import {
  FilterPropsType,
  TodolistDomainType,
  todolistAction,
  todolistThunks,
} from '@/features/TodolistList/model/todolists-reducer'
import { selectIsLoginIn } from '@/features/auth/model/auth.selectors'

export const TodolistList = () => {
  const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists)
  const tasks = useAppSelector<TasksStateType>(selectTasks)
  const isLoggedIn = useAppSelector<boolean>(selectIsLoginIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(todolistThunks.fetchTodolist())
  }, [])

  //task
  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(tasksThunks.removeTask({ taskId, todolistId }))
    },
    [dispatch]
  )
  const addTask = useCallback(
    (id: string, title: string) => {
      dispatch(tasksThunks.addTask({ id, title }))
    },
    [dispatch]
  )
  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(tasksThunks.updateTask({ domainModel: { status }, taskId, todolistId }))
    },
    [dispatch]
  )
  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      dispatch(tasksThunks.updateTask({ domainModel: { title }, taskId, todolistId }))
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
      dispatch(todolistThunks.addTodolist(title))
    },
    [dispatch]
  )
  const removeTodolist = useCallback((id: string) => {
    dispatch(todolistThunks.removeTodolist(id))
  }, [])
  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(todolistThunks.changeTodolistTitle({ id, title }))
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
