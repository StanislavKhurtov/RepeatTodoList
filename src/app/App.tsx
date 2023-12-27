import { useEffect } from "react";
import { TaskType } from "@/api/todolist-api";
import { RequestStatusType } from "@/app/app-reducer";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ErrorSnackbar } from "@/components/ErrorSnackbar/ErrorSnackbar";
import { Header } from "@/components/Header";
import { Linear } from "@/components/Preloader";
import { fetchTodolist } from "@/features/TodolistList/Todolist/todolists-reducer";
import { TodolistList } from "@/features/TodolistList/TodolistList";

export type TasksStateType = {
  [key: string]: TaskType[]
}
export const App = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolist)
  }, [dispatch])

  return (
    <div className={'App'}>
      <ErrorSnackbar />
      <Header />
      {status === 'loading' && <Linear className={'preloader'} />}
      <TodolistList />
    </div>
  )
}


