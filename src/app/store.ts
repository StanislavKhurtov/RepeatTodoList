import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { appReducer } from '@/app/app-reducer'
import { tasksReducer } from '@/features/TodolistList/model/task-reducer'
import { todolistReducer } from '@/features/TodolistList/model/todolists-reducer'
import { authReducer } from '@/features/auth/model/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
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
