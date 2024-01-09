import { useAppDispatch } from '@/common/hooks'
import {
  FilterPropsType,
  TodolistDomainType,
  todolistAction,
} from '@/features/TodolistList/model/todolistsSlice'
import clsx from 'clsx'

type Props = {
  todolist: TodolistDomainType
}
export const FilterTaskButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const filterTasksHandler = (filter: FilterPropsType) => {
    dispatch(todolistAction.changeTodolistFilter({ filter, id: todolist.id }))
  }

  return (
    <div className={'todo__buttons-block'}>
      <button
        className={clsx('todo__btn', { activeFilter: todolist.filter === 'all' })}
        onClick={() => filterTasksHandler('all')}
      >
        All
      </button>
      <button
        className={clsx('todo__btn', { activeFilter: todolist.filter === 'active' })}
        onClick={() => filterTasksHandler('active')}
      >
        Active
      </button>
      <button
        className={clsx('todo__btn', { activeFilter: todolist.filter === 'completed' })}
        onClick={() => filterTasksHandler('completed')}
      >
        Completed
      </button>
    </div>
  )
}
