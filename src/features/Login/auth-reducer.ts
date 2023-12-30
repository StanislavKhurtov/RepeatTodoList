import { AuthParamsType, RESULT_CODE, authAPI } from '@/api/todolist-api'
import { appAction } from '@/app/app-reducer'
import { AppThunk } from '@/app/store'
import { todolistAction } from '@/features/TodolistList/Todolist/todolists-reducer'
import { handleServerAppError, handleServerNetworkError } from '@/utils/error-utils'
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
