import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  taskAPI,
} from '@/api/todolist-api'
import { TasksStateType } from '@/app/App'
import { AppRootStateType } from '@/state/store'
import { Dispatch } from 'redux'

import { AddTodolistType, RemoveTodolistType, SetTodolistsType } from './todolists-reducer'

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId),
      }
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.task.id]: [action.task, ...state[action.task.id]],
      }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: [],
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
// thunk

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
  taskAPI.getTask(todolistId).then(res => {
    dispatch(setTasksAC(todolistId, res.data.items))
  })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  taskAPI.deleteTask(todolistId, taskId).then(() => {
    dispatch(removeTaskAC(todolistId, taskId))
  })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  taskAPI.createTask(todolistId, title).then(res => {
    dispatch(addTaskAC(res.data.data.item))
  })
}
export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
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

    taskAPI.updateTask(todolistId, taskId, apiModel).then(() => {
      dispatch(updateTaskAC(todolistId, taskId, domainModel))
    })
  }
//type

type ActionType =
  | AddTodolistType
  | RemoveTodolistType
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | SetTodolistsType

export type UpdateDomainTaskModelType = {
  deadline?: string
  description?: string
  priority?: TaskPriorities
  startDate?: string
  status?: TaskStatuses
  title?: string
}
