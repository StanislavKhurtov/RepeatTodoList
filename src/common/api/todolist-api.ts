import { instance } from '@/common/api/common.api'
import { TaskPriorities, TaskStatuses } from '@/common/enums/common.enums'
import { ResponseType } from '@/common/types/common.types'
import { AxiosResponse } from 'axios'

export const todolistAPI = {
  createTodolist(title: string) {
    return instance.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<
        ResponseType<{
          item: TodolistType
        }>
      >,
      { title: string }
    >(`todo-lists`, { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  getTodolist() {
    return instance.get<TodolistType[]>(`todo-lists`)
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return instance.put<ResponseType, AxiosResponse<ResponseType>>(`todo-lists/${arg.id}`, {
      title: arg.title,
    })
  },
}

//types

export type TodolistType = {
  addedDate: string
  id: string
  order: number
  title: string
}

export type GetTaskResponse = {
  error: string
  items: TaskType[]
  totalCount: number
}

export type TaskType = {
  addedDate: string
  deadline: string
  description: string
  id: string
  order: number
  priority: TaskPriorities
  startDate: string
  status: TaskStatuses
  title: string
  todoListId: string
}

export type UpdateTaskModelType = {
  deadline: string
  description: string
  priority: TaskPriorities
  startDate: string
  status: TaskStatuses
  title: string
}

export type AuthParamsType = {
  captcha?: string
  email: string
  password: string
  rememberMe: boolean
}

export type UpdateTodolistTitleArgType = {
  id: string
  title: string
}
