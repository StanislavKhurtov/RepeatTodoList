import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

const slice = createSlice({
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
export const appReducer = slice.reducer
