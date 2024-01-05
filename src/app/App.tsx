import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { initializedTC } from '@/app/app-reducer'
import { useAppSelector } from '@/app/store'
import { TaskType } from '@/features/TodolistList/todolist-api'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { ErrorSnackbar } from '@/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '@/components/Header'
import { Linear } from '@/components/Preloader'
import { Login } from '@/features/auth/login'
import { TodolistList } from '@/features/TodolistList/TodolistList'
import { selectIsInitialized } from '@/app/app.selectors'

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
