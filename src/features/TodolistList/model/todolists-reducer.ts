import { RequestStatusType, appAction } from '@/app/app-reducer'
import { RESULT_CODE } from '@/common/enums/common.enums'
import { createAppAsyncThunk } from '@/common/utils/createAppAsyncThunk'
import { handleServerAppError } from '@/common/utils/handleServerAppError'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import {
  TodolistType,
  UpdateTodolistTitleArgType,
  todolistAPI,
} from '@/features/TodolistList/api/todolist-api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = [] as TodolistDomainType[]
const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchTodolist.fulfilled, (state, action) => {
        action.payload.todolists.forEach(tl => {
          state.push({ ...tl, entityStatus: 'idle', filter: 'all' })
        })
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)

        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, entityStatus: 'idle', filter: 'all' })
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)

        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
  },
  initialState,
  name: 'todolists',
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ filter: FilterPropsType; id: string }>
    ) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)

      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    clearStateData: () => {
      return initialState
    },
    setEntityStatus: (
      state,
      action: PayloadAction<{ entityStatus: RequestStatusType; id: string }>
    ) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)

      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    },
  },
})

export const todolistAction = slice.actions
export const todolistReducer = slice.reducer

const fetchTodolist = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  `${slice.name}/fetchTodolist`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      appAction.setStatus({ status: 'loading' })
      const res = await todolistAPI.getTodolist()

      dispatch(appAction.setStatus({ status: 'succeeded' }))

      return { todolists: res.data }
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    }
  }
)

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(
  `${slice.name}/removeTodolist`,
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(appAction.setStatus({ status: 'loading' }))
      dispatch(todolistAction.setEntityStatus({ entityStatus: 'loading', id }))
      const res = await todolistAPI.deleteTodolist(id)

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todolistAction.setEntityStatus({ entityStatus: 'succeeded', id }))
        dispatch(appAction.setStatus({ status: 'succeeded' }))

        return { id }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (e) {
      dispatch(todolistAction.setEntityStatus({ entityStatus: 'idle', id }))
      handleServerNetworkError(e, dispatch)

      return rejectWithValue(null)
    }
  }
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${slice.name}/addTodolist`,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(appAction.setStatus({ status: 'loading' }))
      const res = await todolistAPI.createTodolist(title)

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appAction.setStatus({ status: 'succeeded' }))

        return { todolist: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)

      return rejectWithValue(null)
    }
  }
)

const changeTodolistTitle = createAppAsyncThunk<
  UpdateTodolistTitleArgType,
  UpdateTodolistTitleArgType
>(`${slice.name}/changeTodolistTitle`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(appAction.setStatus({ status: 'loading' }))
    const res = await todolistAPI.updateTodolist(arg)

    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(appAction.setStatus({ status: 'succeeded' }))

      return arg
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)

    return rejectWithValue(null)
  }
})

//types

export const todolistThunks = { addTodolist, changeTodolistTitle, fetchTodolist, removeTodolist }

export type FilterPropsType = 'active' | 'all' | 'completed'

export type TodolistDomainType = TodolistType & {
  entityStatus: RequestStatusType
  filter: FilterPropsType
}
