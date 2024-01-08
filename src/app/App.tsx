import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { selectIsInitialized } from '@/app/app.selectors'
import { useAppSelector } from '@/app/store'
import { Calendar } from '@/common/components/Calendar/Calendar'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '@/common/components/Header'
import { Linear } from '@/common/components/Preloader'
import { useActions } from '@/common/hooks/useActions'
import { TaskType } from '@/features/TodolistList/api/tasksSlice.types'
import { TodolistList } from '@/features/TodolistList/ui/TodolistList'
import { authThunk } from '@/features/auth/model/auth-reducer'
import { Login } from '@/features/auth/ui/login'

export type TasksStateType = {
  [key: string]: TaskType[]
}
export const App = () => {
  const isInitialized = useAppSelector<boolean>(selectIsInitialized)
  const { initialized } = useActions(authThunk)
  const [selectedDate, setSelectedDay] = useState(new Date())

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
        <Route element={<h1>404: PageNote Found</h1>} path={'/404'} />
        <Route element={<Navigate to={'404'} />} path={'*'} />
        <Route
          element={
            <Calendar selectDate={date => setSelectedDay(date)} selectedDate={selectedDate} />
          }
          path={'/calendar'}
        />
      </Routes>
    </div>
  )
}
