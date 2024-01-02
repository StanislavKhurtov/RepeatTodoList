import { RESULT_CODE, TodolistType, todolistAPI } from '@/api/todolist-api'
import { RequestStatusType, appAction } from '@/app/app-reducer'
import { AppThunk } from '@/app/store'
import { handleServerAppError } from '@/utils/handleServerAppError'
import { handleServerNetworkError } from '@/utils/handleServerNetworkError'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

const initialState = [] as TodolistDomainType[]
const slice = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchTodolist.fulfilled, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state.push({ ...tl, entityStatus: 'idle', filter: 'all' })
      })
    })
  },
  initialState,
  name: 'todolists',
  reducers: {
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, entityStatus: 'idle', filter: 'all' })
    },
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ filter: FilterPropsType; id: string }>
    ) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)

      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)

      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
    clearStateData: () => {
      return initialState
    },
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)

      if (index !== -1) {
        state.splice(index, 1)
      }
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

const fetchTodolist = createAsyncThunk<{ todolists: TodolistType[] }, void>(
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

export const removeTodolistTC =
  (id: string): AppThunk =>
  (dispatch: Dispatch) => {
    appAction.setStatus({ status: 'loading' })
    dispatch(todolistAction.setEntityStatus({ entityStatus: 'loading', id }))
    todolistAPI
      .deleteTodolist(id)
      .then(() => {
        dispatch(todolistAction.removeTodolist({ id }))
        dispatch(todolistAction.setEntityStatus({ entityStatus: 'succeeded', id }))
        dispatch(appAction.setStatus({ status: 'succeeded' }))
      })
      .catch(e => {
        dispatch(appAction.setError(e.message))
        dispatch(todolistAction.setEntityStatus({ entityStatus: 'idle', id }))
        dispatch(appAction.setStatus({ status: 'succeeded' }))
      })
  }
export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch: Dispatch) => {
    appAction.setStatus({ status: 'loading' })
    todolistAPI.createTodolist(title).then(res => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todolistAction.addTodolist({ todolist: res.data.data.item }))
        dispatch(appAction.setStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
  }

export const changeTodolistTitleTC =
  (id: string, title: string): AppThunk =>
  (dispatch: Dispatch) => {
    appAction.setStatus({ status: 'loading' })
    todolistAPI.updateTodolist(id, title).then(() => {
      dispatch(todolistAction.changeTodolistTitle({ id, title }))
      dispatch(appAction.setStatus({ status: 'succeeded' }))
    })
  }

//types

export const todolistThunks = { fetchTodolist }

export type FilterPropsType = 'active' | 'all' | 'completed'

export type TodolistDomainType = TodolistType & {
  entityStatus: RequestStatusType
  filter: FilterPropsType
}
