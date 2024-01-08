import React, { ChangeEvent, useCallback } from 'react'

import { Trash } from '@/assets'
import { EditableSpan } from '@/common/components/EditableSpan'
import { TaskStatuses } from '@/common/enums/common.enums'
import { useActions } from '@/common/hooks/useActions'
import { TaskType } from '@/features/TodolistList/api/tasksSlice.types'
import { tasksThunks } from '@/features/TodolistList/model/task-reducer'
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
        className={'todo__input'}
        onChange={onChangeHandlerStatus}
        type={'checkbox'}
      />
      <EditableSpan onChange={changeTaskTitle} title={props.task.title} />
      <button className={'item__btn'} onClick={onClickHandler}>
        {<Trash className={'iconDelete'} />}
      </button>
    </div>
  )
})
