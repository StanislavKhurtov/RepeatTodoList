import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { selectIsInitialized } from '@/app/app.selectors'
import { useAppSelector } from '@/app/store'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '@/common/components/Header'
import { Linear } from '@/common/components/Preloader'
import { useActions } from '@/common/hooks/useActions'
import { TaskType } from '@/features/TodolistList/api/tasksAPI.types'
import { TodolistList } from '@/features/TodolistList/ui/TodolistList'
import { authThunk } from '@/features/auth/model/authSlice'
import { Login } from '@/features/auth/ui/login'
import { PageNotFound } from '@/common/components/PageNotFound/PageNotFound'

export type TasksStateType = {
  [key: string]: TaskType[]
}
export const App = () => {
  const isInitialized = useAppSelector<boolean>(selectIsInitialized)
  const { initialized } = useActions(authThunk)

  useEffect(() => {
    initialized()
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
        <Route element={<PageNotFound />} path={'/404'} />
        <Route element={<Navigate to={'404'} />} path={'*'} />
      </Routes>
    </div>
  )
}
