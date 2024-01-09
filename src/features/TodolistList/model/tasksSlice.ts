import { TasksStateType } from '@/app/App'
import { RESULT_CODE, TaskPriorities, TaskStatuses } from '@/common/enums/common.enums'
import { createAppAsyncThunk } from '@/common/utils/createAppAsyncThunk'
import { tasksAPI } from '@/features/TodolistList/api/tasksAPI'
import { TaskType, UpdateTaskModelType } from '@/features/TodolistList/api/tasksAPI.types'
import { todolistAction, todolistThunks } from '@/features/TodolistList/model/todolistsSlice'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {} as TasksStateType
const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasksForTodo = state[action.payload.task.todoListId]

        tasksForTodo.unshift(action.payload.task)
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasksForTodo = state[action.payload.todolistId]
        const index = tasksForTodo.findIndex(task => task.id === action.payload.taskId)

        if (index !== -1) {
          tasksForTodo.splice(index, 1)
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasksForTodo = state[action.payload.todolistId]
        const index = tasksForTodo.findIndex(todo => todo.id === action.payload.taskId)

        if (index !== -1) {
          tasksForTodo[index] = { ...tasksForTodo[index], ...action.payload.model }
        }
      })
      .addCase(todolistThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistThunks.fetchTodolist.fulfilled, (state, action) => {
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
  reducers: {},
})

export const tasksAction = slice.actions
export const tasksReducer = slice.reducer

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  `${slice.name}/fetchTasks`,
  async todolistId => {
    const res = await tasksAPI.getTask(todolistId)

    return { tasks: res.data.items, todolistId }
  }
)

const removeTask = createAppAsyncThunk<
  { taskId: string; todolistId: string },
  { taskId: string; todolistId: string }
>(`${slice.name}/removeTask`, async (arg, { rejectWithValue }) => {
  const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId)

  if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
    return { taskId: arg.taskId, todolistId: arg.todolistId }
  } else {
    return rejectWithValue(res.data)
  }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, { id: string; title: string }>(
  `${slice.name}/addTask`,
  async (arg, { rejectWithValue }) => {
    const res = await tasksAPI.createTask(arg.id, arg.title)

    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { task: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const updateTask = createAppAsyncThunk<
  { model: UpdateDomainTaskModelType; taskId: string; todolistId: string },
  { domainModel: UpdateDomainTaskModelType; taskId: string; todolistId: string }
>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { getState, rejectWithValue } = thunkAPI
  const state = getState()
  const task = state.tasks[arg.todolistId].find(el => el.id === arg.taskId)

  if (!task) {
    console.warn('Task not found in te state')

    return rejectWithValue(null)
  }

  const apiModel: UpdateTaskModelType = {
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    status: task.status,
    title: task.title,
    ...arg.domainModel,
  }

  const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, apiModel)

  if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
    return { model: arg.domainModel, taskId: arg.taskId, todolistId: arg.todolistId }
  } else {
    return rejectWithValue(res.data)
  }
})

export const tasksThunks = { addTask, fetchTasks, removeTask, updateTask }

//type

type UpdateDomainTaskModelType = {
  deadline?: string
  description?: string
  priority?: TaskPriorities
  startDate?: string
  status?: TaskStatuses
  title?: string
}
