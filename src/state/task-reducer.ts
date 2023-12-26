import {
  RESULT_CODE,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  taskAPI,
} from '@/api/todolist-api'
import { TasksStateType } from '@/app/App'
import { SetErrorType, SetStatusType, setError, setStatus } from '@/app/app-reducer'
import { AppRootStateType } from '@/state/store'
import { Dispatch } from 'redux'

import { AddTodolistType, RemoveTodolistType, SetTodolistsType } from './todolists-reducer'

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId),
      }
    }
    case 'ADD-TASK': {
      return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolist.id]: [],
      }
    }
    case 'REMOVE-TODOLIST': {
      const newState = { ...state }

      delete newState[action.id]

      return newState
    }
    case 'SET-TODOLISTS': {
      const stateCopy = { ...state }

      action.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      })

      return stateCopy
    }
    case 'SET-TASKS': {
      return {
        ...state,
        [action.todolistId]: action.tasks,
      }
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el =>
          el.id === action.taskId ? { ...el, ...action.model } : el
        ),
      }
    }
    default:
      return state
  }
}

// action creator
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({
  tasks,
  todolistId,
  type: 'SET-TASKS' as const,
})
export const removeTaskAC = (todolistId: string, taskId: string) => ({
  taskId,
  todolistId,
  type: 'REMOVE-TASK' as const,
})
export const addTaskAC = (task: TaskType) => ({ task, type: 'ADD-TASK' as const })
export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => ({ model, taskId, todolistId, type: 'UPDATE-TASK' }) as const

// thunk creator
export const fetchTasks = (todolistId: string) => (dispatch: Dispatch<TaskActionType>) => {
  dispatch(setStatus('loading'))
  taskAPI.getTask(todolistId).then(res => {
    dispatch(setTasksAC(todolistId, res.data.items))
    dispatch(setStatus('succeeded'))
  })
}
export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch<TaskActionType>) => {
    taskAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(removeTaskAC(todolistId, taskId))
    })
  }
export const addTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setStatus('loading'))
    taskAPI.createTask(todolistId, title).then(res => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(setStatus('succeeded'))
      } else {
        res.data.messages.length
          ? dispatch(setError(res.data.messages[0]))
          : dispatch(setError('Some error occurred'))

        dispatch(setStatus('failed'))
      }
    })
  }
export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch<TaskActionType>, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(el => el.id === taskId)

    if (!task) {
      console.warn('Task not found in te state')

      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      title: task.title,
      ...domainModel,
    }

    dispatch(setStatus('loading'))
    taskAPI.updateTask(todolistId, taskId, apiModel).then(res => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(updateTaskAC(todolistId, taskId, domainModel))
        dispatch(setStatus('succeeded'))
      } else {
        res.data.messages.length
          ? dispatch(setError(res.data.messages[0]))
          : dispatch(setError('Some error occurred'))

        dispatch(setStatus('failed'))
      }
    })
  }
//type

type TaskActionType =
  | AddTodolistType
  | RemoveTodolistType
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | SetErrorType
  | SetStatusType
  | SetTodolistsType

export type UpdateDomainTaskModelType = {
  deadline?: string
  description?: string
  priority?: TaskPriorities
  startDate?: string
  status?: TaskStatuses
  title?: string
}
