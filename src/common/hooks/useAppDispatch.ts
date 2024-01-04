import { useDispatch } from 'react-redux'

import { AppRootStateType } from '@/app/store'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export type ThunkType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkType>()
