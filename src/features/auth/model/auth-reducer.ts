import { appAction } from '@/app/app-reducer'
import { AppThunk } from '@/app/store'
import { RESULT_CODE } from '@/common/enums/common.enums'
import { handleServerAppError } from '@/common/utils/handleServerAppError'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { todolistAction } from '@/features/TodolistList/model/todolists-reducer'
import { authAPI } from '@/features/auth/api/auth-api'
import { AuthParamsType } from '@/features/auth/api/auth-api.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

const slice = createSlice({
  initialState: {
    isLoggedIn: false,
  },
  name: 'auth',
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authAction = slice.actions
export const authReducer = slice.reducer

// thunks
export const loginTC =
  (data: AuthParamsType): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(appAction.setStatus({ status: 'loading' }))
    authAPI
      .login(data)
      .then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
          dispatch(authAction.setIsLoggedIn({ isLoggedIn: true }))
          dispatch(appAction.setStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

export const logOutTC = (): AppThunk => (dispatch: Dispatch) => {
  dispatch(appAction.setStatus({ status: 'loading' }))
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(authAction.setIsLoggedIn({ isLoggedIn: false }))
        dispatch(appAction.setStatus({ status: 'succeeded' }))
        dispatch(todolistAction.clearStateData())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
}
