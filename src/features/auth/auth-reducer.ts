import { AuthParamsType } from '@/features/TodolistList/todolist-api'
import { appAction } from '@/app/app-reducer'
import { AppThunk } from '@/app/store'
import { todolistAction } from '@/features/TodolistList/todolists-reducer'
import { handleServerAppError } from '@/common/utils/handleServerAppError'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { authAPI } from '@/features/auth/auth-api'
import { RESULT_CODE } from '@/common/enums/common.enums'

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
