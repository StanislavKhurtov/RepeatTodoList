import { AppDispatch, AppRootStateType } from '@/app/store'
import { ResponseType } from '@/common/types/common.types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  rejectValue: ResponseType | null
  state: AppRootStateType
}>()
