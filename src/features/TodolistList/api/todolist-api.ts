import { instance } from '@/common/api/common.api'
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

export type UpdateTodolistTitleArgType = {
  id: string
  title: string
}
