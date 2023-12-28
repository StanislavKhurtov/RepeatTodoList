import { RESULT_CODE, authAPI } from '@/api/todolist-api'
import { SetIsLoginIn, setIsLoggedInAC } from '@/features/Login/auth-reducer'
import { handleServerAppError, handleServerNetworkError } from '@/utils/error-utils'
import { Dispatch } from 'redux'

export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

const initialState = {
  error: null as null | string,
  isInitialized: false,
  status: 'loading' as RequestStatusType,
}

type InitialStateType = typeof initialState

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}

//thunk

export const initializedTC = () => async (dispatch: Dispatch<AppActionsType>) => {
  dispatch(setStatus('loading'))
  try {
    const res = await authAPI.me()

    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setStatus('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
  } finally {
    dispatch(setInitialized(true))
  }
}

// actions
export const setStatus = (status: RequestStatusType) => ({
  status,
  type: 'APP/SET-STATUS' as const,
})
export const setError = (error: null | string) => ({
  error,
  type: 'APP/SET-ERROR' as const,
})
export const setInitialized = (isInitialized: boolean) => ({
  isInitialized,
  type: 'APP/SET-IS-INITIALIZED' as const,
})

type AppActionsType = SetErrorType | SetIsInitialized | SetIsLoginIn | SetStatusType

export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
export type SetIsInitialized = ReturnType<typeof setInitialized>
