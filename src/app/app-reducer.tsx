import { AppThunk } from '@/app/store'
import { authAction } from '@/features/auth/model/auth-reducer'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { handleServerAppError } from '@/common/utils/handleServerAppError'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { authAPI } from '@/features/auth/api/auth-api'
import { RESULT_CODE } from '@/common/enums/common.enums'

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

//thunk
export const initializedTC = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(appAction.setStatus({ status: 'loading' }))
  try {
    const res = await authAPI.me()

    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(authAction.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(appAction.setStatus({ status: 'succeeded' }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
  } finally {
    dispatch(appAction.setInitialized({ isInitialized: true }))
  }
}
