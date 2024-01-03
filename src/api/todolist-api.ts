import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '407432d0-8fb3-48b8-9578-523f43ccc02f',
  },
  withCredentials: true,
})

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

export const taskAPI = {
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

export const authAPI = {
  login(data: AuthParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
  me() {
    return instance.get<ResponseType<{ email: string; id: number; login: string }>>('auth/me')
  },
}

//types

export type TodolistType = {
  addedDate: string
  id: string
  order: number
  title: string
}

export type ResponseType<D = {}> = {
  data: D
  fieldsErrors: Array<string>
  messages: Array<string>
  resultCode: number
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

//enum

export enum TaskStatuses {
  Completed = 2,
  Draft = 3,
  InProgress = 1,
  New = 0,
}

export enum TaskPriorities {
  Hi = 2,
  Later = 4,
  Low = 0,
  Middle = 1,
  Urgently = 3,
}

export enum RESULT_CODE {
  FAILED = 1,
  RECAPTCHA_FAILED = 2,
  SUCCEEDED = 0,
}
