import {
  RESULT_CODE,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  taskAPI,
} from '@/api/todolist-api'
import { TasksStateType } from '@/app/App'
import { appAction } from '@/app/app-reducer'
import { AppRootStateType, AppThunk } from '@/app/store'
import { todolistAction } from '@/features/TodolistList/Todolist/todolists-reducer'
import { handleServerAppError, handleServerNetworkError } from '@/utils/error-utils'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

const initialState = {} as TasksStateType
const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(todolistAction.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistAction.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistAction.setTodolist, (state, action) => {
        action.payload.todolists.forEach(tl => {
          state[tl.id] = []
        })
      })
      .addCase(todolistAction.clearStateData, () => {
        return initialState
      })
  },
  initialState,
  name: 'tasks',
  reducers: {
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasksForTodo = state[action.payload.task.todoListId]

      tasksForTodo.unshift(action.payload.task)
    },
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      const tasksForTodo = state[action.payload.todolistId]
      const index = tasksForTodo.findIndex(task => task.id === action.payload.taskId)

      if (index !== -1) {
        tasksForTodo.splice(index, 1)
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
    updateTask: (
      state,
      action: PayloadAction<{
        model: UpdateDomainTaskModelType
        taskId: string
        todolistId: string
      }>
    ) => {
      const tasksForTodo = state[action.payload.todolistId]
      const index = tasksForTodo.findIndex(todo => todo.id === action.payload.taskId)

      if (index !== -1) {
        tasksForTodo[index] = { ...tasksForTodo[index], ...action.payload.model }
      }
    },
  },
})

export const tasksAction = slice.actions
export const tasksReducer = slice.reducer

const fetchTasks = createAsyncThunk('tasks/fetchTasks', (todolistId: string, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(appAction.setStatus({ status: 'loading' }))
  taskAPI.getTask(todolistId).then(res => {
    dispatch(tasksAction.setTasks({ tasks: res.data.items, todolistId }))
    dispatch(appAction.setStatus({ status: 'succeeded' }))
  })
})

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(appAction.setStatus({ status: 'loading' }))
    taskAPI
      .deleteTask(todolistId, taskId)
      .then(() => {
        dispatch(tasksAction.removeTask({ taskId, todolistId }))
        dispatch(appAction.setStatus({ status: 'succeeded' }))
      })
      .catch((e: AxiosError<ErrorType>) => {
        handleServerNetworkError(e, dispatch)
      })
  }
export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(appAction.setStatus({ status: 'loading' }))
    taskAPI
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
          dispatch(tasksAction.addTask({ task: res.data.data.item }))
          dispatch(appAction.setStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((e: AxiosError<ErrorType>) => {
        handleServerNetworkError(e, dispatch)
      })
  }
export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
  async (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

    try {
      const res = await taskAPI.updateTask(todolistId, taskId, apiModel)

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(tasksAction.updateTask({ model: domainModel, taskId, todolistId }))
        dispatch(appAction.setStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(e, dispatch)
        dispatch(appAction.setStatus({ status: 'failed' }))
      } else {
        const error = e as { message: string }

        handleServerNetworkError(error, dispatch)
      }
    }
  }

export const tasksThunks = { fetchTasks }
//type

type UpdateDomainTaskModelType = {
  deadline?: string
  description?: string
  priority?: TaskPriorities
  startDate?: string
  status?: TaskStatuses
  title?: string
}

type ErrorType = {
  code: number
  field: string
  message: string
}
