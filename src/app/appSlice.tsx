import { tasksThunks } from '@/features/TodolistList/model/tasksSlice'
import { todolistThunks } from '@/features/TodolistList/model/todolistsSlice'
import { PayloadAction, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'

export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(isPending, state => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = 'failed'
        if (action.payload) {
          if (
            action.type === todolistThunks.addTodolist.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type
          ) {
            return
          }

          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : 'Some error occurred'
        }
      })
  },
  initialState: {
    error: null as null | string,
    isInitialized: false,
    status: 'loading' as RequestStatusType,
  },
  name: 'app',
  reducers: {
    setError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
  },
})

export const appAction = slice.actions
export const appSlice = slice.reducer
