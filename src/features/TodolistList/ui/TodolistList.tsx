import { useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { TasksStateType } from '@/app/App'
import { useAppSelector } from '@/app/store'
import { PlusSquareOutline } from '@/assets'
import { AddItemForm } from '@/common/components/AddItemForm'
import { useActions } from '@/common/hooks/useActions'
import { Todolist } from '@/features/TodolistList/Todolist/Todolist'
import { tasksThunks } from '@/features/TodolistList/model/task-reducer'
import { selectTasks } from '@/features/TodolistList/model/tasks.selectors'
import { selectTodolists } from '@/features/TodolistList/model/todolists.selectors'
import { TodolistDomainType, todolistThunks } from '@/features/TodolistList/model/todolists-reducer'
import { selectIsLoginIn } from '@/features/auth/model/auth.selectors'

export const TodolistList = () => {
  const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists)
  const tasks = useAppSelector<TasksStateType>(selectTasks)
  const isLoggedIn = useAppSelector<boolean>(selectIsLoginIn)
  const { addTodolist, fetchTodolist } = useActions({
    ...todolistThunks,
    ...tasksThunks,
  })

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodolist()
  }, [])

  const addTodolistCB = useCallback((title: string) => {
    addTodolist(title)
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={'home__container'}>
      <AddItemForm
        addDate
        addItem={addTodolistCB}
        label={'New Todolist'}
        trigger={<PlusSquareOutline className={'icon'} />}
      />
      {todolists.map(todolist => {
        const taskForTodolist = tasks[todolist.id]

        return <Todolist key={todolist.id} tasks={taskForTodolist} todolist={todolist} />
      })}
    </div>
  )
}
