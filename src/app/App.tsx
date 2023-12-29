import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { TaskType } from '@/api/todolist-api'
import { initializedTC } from '@/app/app-reducer'
import { useAppSelector } from '@/app/store'
import { ErrorSnackbar } from '@/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '@/components/Header'
import { Linear } from '@/components/Preloader'
import { Login } from '@/features/Login/login'
import { TodolistList } from '@/features/TodolistList/TodolistList'
import { useAppDispatch } from '@/hooks/useAppDispatch'

export type TasksStateType = {
  [key: string]: TaskType[]
}
export const App = () => {
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
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
