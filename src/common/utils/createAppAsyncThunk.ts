import { AppDispatch, AppRootStateType } from '@/app/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  rejectValue: null
  state: AppRootStateType
}>()
