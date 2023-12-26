import React, { useCallback, useEffect } from 'react'

import { AddItemForm } from '@/components/AddItemForm'
import { EditableSpan } from '@/components/EditableSpan'
import clsx from 'clsx'

import { TaskStatuses, TaskType } from './api/todolist-api'
import { PlusSquareOutline } from './assets'
import Trash from './assets/trash'
import { Task } from './components/Task/Task'
import { useAppDispatch } from './state/store'
import { fetchTasks } from './state/task-reducer'
import { FilterPropsType } from './state/todolists-reducer'

type Props = {
  addTask: (todolistId: string, title: string) => void
  changeFilter: (todolistId: string, filter: FilterPropsType) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  filter: FilterPropsType
  id: string
  removeTask: (todolistId: string, taskId: string) => void
  removeTodolist: (id: string) => void
  tasks: TaskType[]
  title: string
}
export const Todolist = React.memo((props: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks(props.id))
  }, [])

  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.id, title)
    },
    [props.addTask, props.id]
  )
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title)
    },
    [props.changeTodolistTitle, props.id]
  )

  const onAllClickHandler = useCallback(
    () => props.changeFilter(props.id, 'all'),
    [props.changeFilter, props.id]
  )
  const onActiveClickHandler = useCallback(
    () => props.changeFilter(props.id, 'active'),
    [props.changeFilter, props.id]
  )
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter(props.id, 'completed'),
    [props.changeFilter, props.id]
  )

  let taskForTodolist = props.tasks

  if (props.filter === 'active') {
    taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed)
  }

  return (
    <div className={'todo'}>
      <div className={'todo__body'}>
        <h3 className={'todo__title title'}>
          <EditableSpan onChange={changeTodolistTitle} title={props.title} />
          <button className={'todo__btnDelete'} onClick={removeTodolist}>
            {<Trash className={'iconDelete'} />}
          </button>
        </h3>
        <AddItemForm addItem={addTask} trigger={<PlusSquareOutline className={'icon'} />} />
        <div className={'todo__items'}>
          {taskForTodolist?.map(task => (
            <Task
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}
              key={task.id}
              removeTask={props.removeTask}
              task={task}
              todolistId={props.id}
            />
          ))}
        </div>
        <div className={'todo__buttons-block'}>
          <button
            className={clsx('todo__btn', { activeFilter: props.filter === 'all' })}
            onClick={onAllClickHandler}
          >
            All
          </button>
          <button
            className={clsx('todo__btn', { activeFilter: props.filter === 'active' })}
            onClick={onActiveClickHandler}
          >
            Active
          </button>
          <button
            className={clsx('todo__btn', { activeFilter: props.filter === 'completed' })}
            onClick={onCompletedClickHandler}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  )
})
