import { useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { TasksStateType } from '@/app/App'
import { useAppSelector } from '@/app/store'
import { PlusSquareOutline } from '@/assets'
import { AddItemForm } from '@/common/components/AddItemForm'
import { TaskStatuses } from '@/common/enums/common.enums'
import { useActions } from '@/common/hooks/useActions'
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
  const {
    addTask,
    addTodolist,
    changeTodolistTitle,
    fetchTodolist,
    removeTask,
    removeTodolist,
    updateTask,
  } = useActions({
    ...todolistThunks,
    ...tasksThunks,
  })

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodolist()
  }, [])

  //task
  const removeTaskCB = useCallback((todolistId: string, taskId: string) => {
    removeTask({ taskId, todolistId })
  }, [])
  const addTaskCB = useCallback((id: string, title: string) => {
    addTask({ id, title })
  }, [])
  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      updateTask({ domainModel: { status }, taskId, todolistId })
    },
    []
  )
  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    updateTask({ domainModel: { title }, taskId, todolistId })
  }, [])

  //todo
  const changeFilter = useCallback((id: string, filter: FilterPropsType) => {
    dispatch(todolistAction.changeTodolistFilter({ filter, id }))
  }, [])
  const addTodolistCB = useCallback((title: string) => {
    addTodolist(title)
  }, [])
  const removeTodolistCB = useCallback((id: string) => {
    removeTodolist(id)
  }, [])
  const changeTodolistTitleCB = useCallback(
    (id: string, title: string) => {
      changeTodolistTitle({ id, title })
    },
    [dispatch]
  )

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={'home__container'}>
      <AddItemForm
        addItem={addTodolistCB}
        label={'New Todolist'}
        trigger={<PlusSquareOutline className={'icon'} />}
      />
      {todolists.map(todolist => {
        const taskForTodolist = tasks[todolist.id]

        return (
          <Todolist
            addTask={addTaskCB}
            changeFilter={changeFilter}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitleCB}
            entityStatus={todolist.entityStatus}
            filter={todolist.filter}
            id={todolist.id}
            key={todolist.id}
            removeTask={removeTaskCB}
            removeTodolist={removeTodolistCB}
            tasks={taskForTodolist}
            title={todolist.title}
          />
        )
      })}
    </div>
  )
}
