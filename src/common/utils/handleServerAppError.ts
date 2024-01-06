// generic function
import { appAction } from '@/app/app-reducer'
import { ResponseType } from '@/common/types/common.types'
import { Dispatch } from 'redux'

/**
 Handles server-side application errors and updates the Redux store accordingly.
 @template T - The type parameter for the response data.
 @param {ResponseType<T>} data - The response object containing the error messages.
 @param {Dispatch} dispatch - The function from the Redux store to dispatch actions.
 @returns {void}
 */
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  data.messages.length
    ? dispatch(appAction.setError({ error: data.messages[0] }))
    : dispatch(appAction.setError({ error: 'Some error occurred' }))

  dispatch(appAction.setStatus({ status: 'failed' }))
}
