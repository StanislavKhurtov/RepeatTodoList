export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

const initialState = {
  error: null as null | string,
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
    default:
      return state
  }
}
export const setStatus = (status: RequestStatusType) => ({
  status,
  type: 'APP/SET-STATUS' as const,
})
export const setError = (error: null | string) => ({
  error,
  type: 'APP/SET-ERROR' as const,
})

type AppActionsType = SetErrorType | SetStatusType

export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
