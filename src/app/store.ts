import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { appReducer } from '@/app/app-reducer'
import { authReducer } from '@/features/Login/auth-reducer'
import { tasksReducer } from '@/features/TodolistList/Todolist/task-reducer'
import { todolistReducer } from '@/features/TodolistList/Todolist/todolists-reducer'
import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  tasks: tasksReducer,
  todolists: todolistReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
