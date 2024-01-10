import React, { ChangeEvent, useCallback } from 'react'

import { RemoveIcon } from '@/assets'
import { EditableSpan } from '@/common/components/EditableSpan'
import { TaskStatuses } from '@/common/enums/common.enums'
import { useActions } from '@/common/hooks/useActions'
import { TaskType } from '@/features/TodolistList/api/tasksAPI.types'
import { tasksThunks } from '@/features/TodolistList/model/tasksSlice'
import clsx from 'clsx'

type Props = {
  task: TaskType
  todolistId: string
}
export const Task = React.memo((props: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks)
  const onClickHandler = () => removeTask({ taskId: props.task.id, todolistId: props.todolistId })
  const changeTaskTitle = (title: string) => {
    updateTask({ domainModel: { title }, taskId: props.task.id, todolistId: props.todolistId })
  }
  const onChangeHandlerStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New

      updateTask({
        domainModel: { status },
        taskId: props.task.id,
        todolistId: props.todolistId,
      })
    },
    [props.todolistId, props.task.id, updateTask]
  )

  return (
    <div
      className={clsx('todo__item', 'item', {
        isDone: props.task.status === TaskStatuses.Completed,
      })}
    >
      <input
        checked={props.task.status === TaskStatuses.Completed}
        className={'todo__input ui-checkbox'}
        onChange={onChangeHandlerStatus}
        type={'checkbox'}
      />
      <EditableSpan className={'item__text'} onChange={changeTaskTitle} title={props.task.title} />
      <div className={'item__fill'}></div>
      <button className={'item__btn'} onClick={onClickHandler}>
        {<RemoveIcon className={'iconDelete'} />}
      </button>
    </div>
  )
})
