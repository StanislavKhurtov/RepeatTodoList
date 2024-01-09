import { appAction } from '@/app/appSlice'
import { RESULT_CODE } from '@/common/enums/common.enums'
import { createAppAsyncThunk } from '@/common/utils'
import { todolistAction } from '@/features/TodolistList/model/todolistsSlice'
import { authAPI } from '@/features/auth/api/auth-api'
import { AuthParamsType } from '@/features/auth/api/auth-api.types'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
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
  initialState: {
    isLoggedIn: false,
  },
  name: 'auth',
  reducers: {},
})

const logIn = createAppAsyncThunk<{ isLoggedIn: true }, AuthParamsType>(
  `${slice.name}/login`,
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg)

    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const res = await authAPI.logout()

    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(todolistAction.clearStateData())

      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const initialized = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initialized`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      const res = await authAPI.me()

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return { isLoggedIn: true }
      } else {
        return rejectWithValue(null)
      }
    } catch (e) {
      return rejectWithValue(null)
    } finally {
      dispatch(appAction.setInitialized({ isInitialized: true }))
    }
  }
)

export const authSlice = slice.reducer
export const authThunk = { initialized, logIn, logOut }
