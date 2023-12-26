export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

const initialState = {
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
    default:
      return state
  }
}
export const setStatus = (status: RequestStatusType) => ({
  status,
  type: 'APP/SET-STATUS' as const,
})
type AppActionsType = ReturnType<typeof setStatus>
