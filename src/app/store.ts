import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { appSlice } from '@/app/appSlice'
import { tasksReducer } from '@/features/TodolistList/model/tasksSlice'
import { todolistReducer } from '@/features/TodolistList/model/todolistsSlice'
import { authSlice } from '@/features/auth/model/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    tasks: tasksReducer,
    todolists: todolistReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
