import React, { useEffect } from 'react'

import { PlusSquareOutline } from '@/assets'
import { AddItemForm } from '@/common/components/AddItemForm'
import { useActions } from '@/common/hooks/useActions'
import { TaskType } from '@/features/TodolistList/api/tasksAPI.types'
import { tasksThunks } from '@/features/TodolistList/model/tasksSlice'
import { TodolistDomainType } from '@/features/TodolistList/model/todolistsSlice'
import { FilterTaskButtons } from '@/features/TodolistList/ui/Todolist/FilterTaskButtons/FilterTaskButtons'
import { Tasks } from '@/features/TodolistList/ui/Todolist/Tasks/Tasks'
import { TodolistTitle } from '@/features/TodolistList/ui/Todolist/TodolistTitle/TodolistTitle'

type Props = {
  tasks: TaskType[]
  todolist: TodolistDomainType
}
export const Todolist = React.memo(({ tasks, todolist }: Props) => {
  const { addTask, fetchTasks } = useActions(tasksThunks)

  useEffect(() => {
    fetchTasks(todolist.id)
  }, [])

  const addTaskCB = (title: string) => {
    addTask({ id: todolist.id, title })
  }

  return (
    <div className={'todo'}>
      <div className={'todo__body'}>
        <TodolistTitle todolist={todolist} />
        <AddItemForm
          addItem={addTaskCB}
          disabled={todolist.entityStatus === 'loading'}
          trigger={<PlusSquareOutline className={'icon'} />}
        />
        <Tasks tasks={tasks} todolist={todolist} />
        <FilterTaskButtons todolist={todolist} />
      </div>
    </div>
  )
})
