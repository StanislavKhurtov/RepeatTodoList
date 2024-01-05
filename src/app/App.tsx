import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { selectIsInitialized } from '@/app/app.selectors'
import { initializedTC } from '@/app/app-reducer'
import { useAppSelector } from '@/app/store'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '@/common/components/Header'
import { Linear } from '@/common/components/Preloader'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { TodolistList } from '@/features/TodolistList/TodolistList'
import { TaskType } from '@/features/TodolistList/task-api'
import { Login } from '@/features/auth/login'

export type TasksStateType = {
  [key: string]: TaskType[]
}
export const App = () => {
  const isInitialized = useAppSelector<boolean>(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializedTC())
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
