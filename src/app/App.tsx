import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { selectIsInitialized } from '@/app/app.selectors'
import { useAppSelector } from '@/app/store'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '@/common/components/Header'
import { Linear } from '@/common/components/Preloader'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { TaskType } from '@/features/TodolistList/api/task-api'
import { TodolistList } from '@/features/TodolistList/ui/TodolistList'
import { authThunk } from '@/features/auth/model/auth-reducer'
import { Login } from '@/features/auth/ui/login'

export type TasksStateType = {
  [key: string]: TaskType[]
}
export const App = () => {
  const isInitialized = useAppSelector<boolean>(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunk.initialized())
  }, [])

  if (!isInitialized) {
    return <Linear />
  }

  return (
    <div className={'App'}>
      <ErrorSnackbar />
      <Header />
      <Routes>
        <Route element={<TodolistList />} path={'/'} />
        <Route element={<Login />} path={'/login'} />
        <Route element={<h1>404: PageNote Found</h1>} path={'/404'} />
        <Route element={<Navigate to={'404'} />} path={'*'} />
      </Routes>
    </div>
  )
}
