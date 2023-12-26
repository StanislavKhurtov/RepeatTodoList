import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appReducer } from '@/app/app-reducer'
import { tasksReducer } from '@/state/task-reducer'
import { todolistReducer } from '@/state/todolists-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type ThunkType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
