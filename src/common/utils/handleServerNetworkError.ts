import { appAction } from '@/app/appSlice'
import { AppDispatch } from '@/app/store'
import axios from 'axios'

/**
 * Handles server network errors and updates the Redux store accordingly.
 *
 * @param {unknown} err - The error object representing the network error.
 * @param {AppDispatch} dispatch - The function from the Redux store to dispatch actions.
 * @returns {void}
 */
export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
  let errorMessage = 'Some error occurred'

  // ❗Проверка на наличие axios ошибки
  if (axios.isAxiosError(err)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage
    // ❗ Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
    // ❗Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appAction.setError({ error: errorMessage }))
  dispatch(appAction.setStatus({ status: 'failed' }))
}
