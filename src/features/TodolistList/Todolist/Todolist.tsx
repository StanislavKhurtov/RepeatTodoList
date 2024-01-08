import React, { useEffect } from 'react'

import { PlusSquareOutline, Trash } from '@/assets'
import { AddItemForm } from '@/common/components/AddItemForm'
import { EditableSpan } from '@/common/components/EditableSpan'
import { TaskStatuses } from '@/common/enums'
import { useActions } from '@/common/hooks/useActions'
import { FilterTaskButtons } from '@/features/TodolistList/Todolist/Task/FilterTaskButtons/FilterTaskButtons'
import { Task } from '@/features/TodolistList/Todolist/Task/Task'
import { TaskType } from '@/features/TodolistList/api/tasksSlice.types'
import { tasksThunks } from '@/features/TodolistList/model/task-reducer'
import { TodolistDomainType, todolistThunks } from '@/features/TodolistList/model/todolists-reducer'

type Props = {
  tasks: TaskType[]
  todolist: TodolistDomainType
}
export const Todolist = React.memo(({ tasks, todolist }: Props) => {
  const { addTask, changeTodolistTitle, fetchTasks, removeTodolist } = useActions({
    ...tasksThunks,
    ...todolistThunks,
  })

  useEffect(() => {
    fetchTasks(todolist.id)
  }, [])

  const addTaskCB = (title: string) => {
    addTask({ id: todolist.id, title })
  }
  const removeTodolistCB = () => {
    removeTodolist(todolist.id)
  }

  const changeTodolistTitleCB = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title })
  }
  let taskForTodolist = tasks

  if (todolist.filter === 'active') {
    taskForTodolist = tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (todolist.filter === 'completed') {
    taskForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed)
  }

  return (
    <div className={'todo'}>
      <div className={'todo__body'}>
        <h3 className={'todo__title title'}>
          <EditableSpan onChange={changeTodolistTitleCB} title={todolist.title} />
          <button
            className={'todo__removeButton'}
            disabled={todolist.entityStatus === 'loading'}
            onClick={removeTodolistCB}
          >
            {
              <Trash
                className={`iconDelete ${todolist.entityStatus === 'loading' ? 'disabled' : ''}`}
              />
            }
          </button>
        </h3>
        <AddItemForm
          addItem={addTaskCB}
          disabled={todolist.entityStatus === 'loading'}
          trigger={<PlusSquareOutline className={'icon'} />}
        />
        <div className={'todo__items'}>
          {taskForTodolist?.map(task => (
            <Task key={task.id} task={task} todolistId={todolist.id} />
          ))}
        </div>
        <FilterTaskButtons todolist={todolist} />
      </div>
    </div>
  )
})
