import { appAction } from '@/app/app-reducer'

import { RESULT_CODE } from '@/common/enums/common.enums'
import { handleServerAppError } from '@/common/utils/handleServerAppError'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { todolistAction } from '@/features/TodolistList/model/todolists-reducer'
import { authAPI } from '@/features/auth/api/auth-api'
import { AuthParamsType } from '@/features/auth/api/auth-api.types'
import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '@/common/utils'

const slice = createSlice({
  initialState: {
    isLoggedIn: false,
  },
  extraReducers: builder => {
    builder
      .addCase(authThunk.logIn.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(authThunk.logOut.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(authThunk.initialized.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
  name: 'auth',
  reducers: {},
})

const logIn = createAppAsyncThunk<{ isLoggedIn: true }, AuthParamsType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appAction.setStatus({ status: 'loading' }))
      const res = await authAPI.login(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appAction.setStatus({ status: 'succeeded' }))

        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    }
  }
)

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(appAction.setStatus({ status: 'loading' }))
      const res = await authAPI.logout()
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appAction.setStatus({ status: 'succeeded' }))
        dispatch(todolistAction.clearStateData())

        return { isLoggedIn: false }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    }
  }
)

const initialized = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initialized`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appAction.setStatus({ status: 'loading' }))
      const res = await authAPI.me()

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appAction.setStatus({ status: 'succeeded' }))

        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string }, dispatch)

      return rejectWithValue(null)
    } finally {
      dispatch(appAction.setInitialized({ isInitialized: true }))
    }
  }
)

export const authReducer = slice.reducer
export const authThunk = { logIn, logOut, initialized }
