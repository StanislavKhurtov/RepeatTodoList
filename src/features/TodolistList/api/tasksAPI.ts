import { instance } from '@/common/api/common.api'
import { ResponseType } from '@/common/types/common.types'
import {
  GetTaskResponse,
  TaskType,
  UpdateTaskModelType,
} from '@/features/TodolistList/api/tasksAPI.types'
import { AxiosResponse } from 'axios'

export const tasksAPI = {
  createTask(todolistId: string, title: string) {
    return instance.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      {
        title: string
      }
    >(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  getTask(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<
        ResponseType<{
          item: TaskType
        }>
      >,
      UpdateTaskModelType
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
