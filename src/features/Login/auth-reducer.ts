import { AuthParamsType, RESULT_CODE, authAPI } from '@/api/todolist-api'
import { SetErrorType, SetStatusType, setStatus } from '@/app/app-reducer'
import {
  ClearStateDataAC,
  ClearStateDataType,
} from '@/features/TodolistList/Todolist/todolists-reducer'
import { handleServerAppError, handleServerNetworkError } from '@/utils/error-utils'
import { Dispatch } from 'redux'

const initialState = {
  isLoggedIn: false,
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value }) as const

// thunks
export const loginTC = (data: AuthParamsType) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setStatus('loading'))
  authAPI
    .login(data)
    .then(res => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setStatus('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
}

export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setStatus('loading'))
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setStatus('succeeded'))
        dispatch(ClearStateDataAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
}

// types
type ActionsType = ClearStateDataType | SetErrorType | SetIsLoginIn | SetStatusType
export type SetIsLoginIn = ReturnType<typeof setIsLoggedInAC>
