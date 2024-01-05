import React, { ChangeEvent } from 'react'

import { Trash } from '@/assets'
import { EditableSpan } from '@/common/components/EditableSpan'
import { TaskStatuses } from '@/common/enums/common.enums'
import { TaskType } from '@/features/TodolistList/task-api'
import clsx from 'clsx'

type TaskProps = {
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  task: TaskType
  todolistId: string
}
export const Task = React.memo((props: TaskProps) => {
  const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)
  const changeTaskTitle = (title: string) => {
    props.changeTaskTitle(props.todolistId, props.task.id, title)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(
      props.todolistId,
      props.task.id,
      e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    )
  }

  return (
    <div
      className={clsx('todo__item', 'item', {
        isDone: props.task.status === TaskStatuses.Completed,
      })}
    >
      <input
        checked={props.task.status === TaskStatuses.Completed}
        className={'todo__input'}
        onChange={onChangeHandler}
        type={'checkbox'}
      />
      <EditableSpan onChange={changeTaskTitle} title={props.task.title} />
      <button className={'item__btn'} onClick={onClickHandler}>
        {<Trash className={'iconDelete'} />}
      </button>
    </div>
  )
})
