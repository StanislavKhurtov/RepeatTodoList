// generic function
import { ResponseType } from '@/api/todolist-api'
import { SetErrorType, SetStatusType, setError, setStatus } from '@/app/app-reducer'
import { Dispatch } from 'redux'

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ErrorUtilsDispatchType
) => {
  data.messages.length
    ? dispatch(setError(data.messages[0]))
    : dispatch(setError('Some error occurred'))

  dispatch(setStatus('failed'))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType
) => {
  dispatch(setError(error.message))
  dispatch(setStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorType | SetStatusType>
