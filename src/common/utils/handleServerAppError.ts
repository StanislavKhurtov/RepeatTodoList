// generic function
import { appAction } from '@/app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '@/common/types/common.types'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  data.messages.length
    ? dispatch(appAction.setError({ error: data.messages[0] }))
    : dispatch(appAction.setError({ error: 'Some error occurred' }))

  dispatch(appAction.setStatus({ status: 'failed' }))
}
